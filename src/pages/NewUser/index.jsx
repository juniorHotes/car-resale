import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'
import { ModalContext } from '../../App'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

export default function NewUser() {
    const history = useHistory()

    const formRef = useRef(null);
    const { openModal } = useContext(ModalContext)

    const [preload, setPreload] = useState(false)

    const [uf, setUF] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [region, setRegion] = useState('')
    const [ibgenumber, setIbgenumber] = useState('')
    const [phone, setPhone] = useState('')
    const [showInput, setShowInput] = useState('')

    async function getAddres(cep) {
        formRef.current.setFieldError('cep', '')

        if (cep.length === 8) {
            const addres = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(e => e.json())
            const cepNotFound = addres.erro

            if (cepNotFound) {
                return formRef.current.setFieldError("cep", "CEP não encontrado")
            }

            setShowInput('show-input')

            setUF(addres.uf)
            setCity(addres.localidade)
            setStreet(addres.logradouro)
            setRegion(addres.bairro)
            setIbgenumber(addres.ibge)

        } else {
            setShowInput('')

            setUF('')
            setCity('')
            setStreet('')
            setRegion('')
            setIbgenumber('')
        }
    }

    async function handleSubmit(data, { reset }) {

        formRef.current.setErrors({})

        if (data.password !== data.passwordrepeat) {
            return formRef.current.setFieldError('passwordrepeat', "A senha é diferente da digitada acima")
        }

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Digite um e-mail válido")
                    .required("O e-mail é obrigatório"),

                name: Yup.string()
                    .min(3, "Nome muito curto")
                    .required("O nome é obrigatório"),

                password: Yup.string()
                    .min(6, "Sua senha deve ser maio que 6 caracteres")
                    .required("Forneça sua senha por favor"),

                cep: Yup.string()
                    .min(8, "CEP não encontrado")
                    .required("Forneça seu CEP para preencher seu endereço"),

                phone: Yup.string()
                    .min(15, "Forneça um número de telefone válido")
                    .required("Forneça seu número de telefone para contato"),
            })

            await schema.validate(data, {
                abortEarly: false
            })

            setPreload(true)

            await api.post('/api/user', { ...data, ibgenumber: Number(data.ibgenumber) })
                .then(() => {
                    reset()
                    setPhone('')
                    setPreload(false)
                    openModal('Cadastrado com sucesso', '', () => setTimeout(() => history.push('/login'), 1000))
                }).catch(err => {
                    setPreload(false)
                    openModal('Erro ao fazer cadastro', 'Erro na requisição')
                })

        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }

    const formatPhoneNumber = (str) => {

        const cleaned = ('' + str).replace(/\D/g, '');

        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        };

        return null
    };

    function phoneNumberFormatter(value) {
        const formattedInputValue = formatPhoneNumber(value);
        setPhone(formattedInputValue)
    }

    return (
        <>
            <NavBar />
            <div className='container'>
                <div className="form-content">
                    <div className="form-title">
                        <h3>Faça seu cadastro</h3>
                        <span>Todos os campos com * são obrigatórios</span>
                    </div>

                    <Form onSubmit={handleSubmit} ref={formRef}>

                        <Input
                            label="E-mail*"
                            type="text"
                            name="email"
                            placeholder="Ex: email@email.com"
                            disabled={preload}
                        />

                        <Input
                            label="Nome*"
                            type="text"
                            name="name"
                            placeholder="Ex: jhon Doe"
                            disabled={preload}
                        />

                        <Input
                            label="Senha*"
                            type="password"
                            name="password"
                            placeholder="********"
                            disabled={preload}
                        />

                        <Input
                            label="Repita a senha*"
                            type="password"
                            name="passwordrepeat"
                            placeholder="********"
                            disabled={preload}
                        />

                        <Input
                            label="CEP*"
                            type="number"
                            name="cep"
                            placeholder="Ex: 12345678"
                            disabled={preload}
                            onChange={(e) => getAddres(e.target.value)}
                        />

                        <div className={`hide-input ${showInput}`}>
                            <Input
                                label="Estado"
                                type="text"
                                name="state"
                                defaultValue={uf}
                                placeholder=""
                                disabled={preload}
                            />

                            <Input
                                label="Cidade"
                                type="text"
                                name="city"
                                defaultValue={city}
                                placeholder=""
                                disabled={preload}
                            />

                            <Input
                                label="Região"
                                type="text"
                                name="region"
                                defaultValue={region}
                                placeholder=""
                                disabled={preload}
                            />

                            <Input
                                label="Rua"
                                type="text"
                                name="street"
                                defaultValue={street}
                                placeholder=""
                                disabled={preload}
                            />

                            <Input
                                label="Número"
                                type="text"
                                name="number"
                                placeholder=""
                                disabled={preload}
                            />

                            <Input
                                type="hidden"
                                name="ibgenumber"
                                defaultValue={ibgenumber}
                                placeholder=""
                            />
                        </div>

                        <Input
                            label="Telefone com DDD*"
                            type="tel"
                            name="phone"
                            value={phone}
                            placeholder="Ex: (00) 12345-6789"
                            disabled={preload}
                            onChange={(e) => phoneNumberFormatter(e.target.value)}
                        />

                        <div className="preload">
                            {preload &&
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            }
                            <button disabled={preload}
                                className="btn btn-large btn-100"
                                type="submit"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </Form>

                </div>
            </div>
            <Footer />
        </>
    )
}