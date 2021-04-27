import React, { useEffect, useRef, useState } from 'react'
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
        if(data.password != data.passwordrepeat) {
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

            console.log(data)

            await api.post('/api/user', data).then(() => {
                // skyLightRef.current.props.title = "Cadastro realizado com sucesso!"
                skyLightRef.current.show()
                formRef.current.setErrors({})
            }).catch(err => {
                // skyLightRef.current.props.title = "Erro ao realizar cadastro!"
                skyLightRef.current.show()
            })

            reset()

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

    let formatPhoneNumber = (str) => {

        let cleaned = ('' + str).replace(/\D/g, '');

        let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

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
            <SkyLight hideOnOverlayClicked ref={skyLightRef} title="">
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
                                value={uf}
                                placeholder=""
                            />

                            <Input
                                label="Cidade"
                                type="text"
                                name="city"
                                value={city}
                                placeholder=""
                            />

                            <Input
                                label="Região"
                                type="text"
                                name="region"
                                value={region}
                                placeholder=""
                            />

                            <Input
                                label="Rua"
                                type="text"
                                name="street"
                                value={street}
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
                                value={ibgenumber}
                                placeholder=""
                            />
                        </div>

                        <Input
                            onChange={(e) => phoneNumberFormatter(e.target.value)}
                            label="Telefone com DDD"
                            type="tel"
                            name="phone"
                            value={phone}
                            placeholder=""
                        />

                        <button
                            className="btn btn-large btn-100"
                            type="submit"
                        >Cadastrar</button>
                    </Form>

                </div>
            </div>
            <Footer />
        </>
    )
}