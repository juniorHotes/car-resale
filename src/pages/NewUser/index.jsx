import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'
import SkyLight from 'react-skylight'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

export default function NewUser() {
    const formRef = useRef(null);
    const skyLightRef = useRef(null);

    const [preload, setPreload] = useState(false)
    const [dialogMsg, setDialogMsg] = useState(['', ''])

    const [uf, setUF] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [region, setRegion] = useState('')
    const [ibgenumber, setIbgenumber] = useState('')
    const [phone, setPhone] = useState('')
    const [showInput, setShowInput] = useState('')

    async function getAddres(cep) {
        formRef.current.setFieldError('cep', '')

        if (cep.length == 8) {
            const addres = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(e => e.json()).catch(err => err)
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

        if (data.password != data.passwordrepeat) {
            return formRef.current.setFieldError('passwordrepeat', "A senha é diferente")
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
                    .min(15, "Revise o número")
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
                    setDialogMsg(['Cadastrado com sucesso', ''])
                    skyLightRef.current.show()
                }).catch(err => {
                    setPreload(false)
                    setDialogMsg(['Erro ao fazer cadastro', 'Erro na requisição'])
                    skyLightRef.current.show()
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
            <SkyLight ref={skyLightRef}
                dialogStyles={{
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '2rem'
                }}
                title={dialogMsg[0]} >
                {dialogMsg[1]}
            </SkyLight>

            <NavBar />
            <div className='container'>
                <div className="form-content">
                    <div className="form-title">
                        <h3>Faça seu cadastro</h3>
                        <span>Todos os campos são obrigatórios</span>
                    </div>

                    <Form onSubmit={handleSubmit} ref={formRef}>

                        <Input
                            label="E-mail"
                            type="text"
                            name="email"
                            placeholder="Ex: email@email.com"
                        />

                        <Input
                            label="Nome"
                            type="text"
                            name="name"
                            placeholder="Ex: jhon Doe"
                        />

                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            placeholder="********"
                        />

                        <Input
                            label="Repita a senha"
                            type="password"
                            name="passwordrepeat"
                            placeholder="********"
                        />

                        <Input
                            onChange={(e) => getAddres(e.target.value)}
                            label="CEP"
                            type="number"
                            name="cep"
                            placeholder="Ex: 12345678"
                        />

                        <div className={`hide-input ${showInput}`}>
                            <Input
                                label="Estado"
                                type="text"
                                name="state"
                                defaultValue={uf}
                                placeholder=""
                            />

                            <Input
                                label="Cidade"
                                type="text"
                                name="city"
                                defaultValue={city}
                                placeholder=""
                            />

                            <Input
                                label="Região"
                                type="text"
                                name="region"
                                defaultValue={region}
                                placeholder=""
                            />

                            <Input
                                label="Rua"
                                type="text"
                                name="street"
                                defaultValue={street}
                                placeholder=""
                            />

                            <Input
                                label="Número"
                                type="text"
                                name="number"
                                placeholder=""
                            />

                            <Input
                                label="Codigo IBGE "
                                type="number"
                                name="ibgenumber"
                                defaultValue={ibgenumber}
                                placeholder=""
                            />
                        </div>

                        <Input
                            onChange={(e) => phoneNumberFormatter(e.target.value)}
                            label="Telefone com DDD"
                            type="tel"
                            name="phone"
                            value={phone}
                            placeholder="Ex: (00) 12345-6789"
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