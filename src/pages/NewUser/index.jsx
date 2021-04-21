import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

export default function NewUser() {
    const formRef = useRef(null);

    const [uf, setUF] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [region, setRegion] = useState('')
    const [ibgenumber, setIbgenumber] = useState('')

    const [phone, setPhone] = useState('')


    async function getAddres(cep) {
        formRef.current.setFieldError('cep', '')

        if (cep.length == 8) {
            const addres = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(e => e.json()).catch(err => err)
            const cepNotFound = addres.erro

            cepNotFound && formRef.current.setFieldError("cep", "CEP não encontrado")

            setUF(addres.uf)
            setCity(addres.localidade)
            setStreet(addres.logradouro)
            setRegion(addres.bairro)
            setIbgenumber(addres.ibge)

            console.log(addres)
        }
    }

    async function handleSubmit(data, { reset }) {
        if (data.password != data.passwordrepeat) {
            formRef.current.setFieldError('passwordrepeat', 'As senhas não são iguais')
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
                    .required("Forneça sua senha por favor")
            })

            await schema.validate(data, {
                abortEarly: false
            })

            formRef.current.setErrors({})

            reset()

            console.log(data)

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

    function formatPhoneNumber(value) {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}`;
    }

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
                            type="text"
                            name="cep"
                            placeholder="Ex: 12345789"
                        />

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
                            type="text"
                            name="ibgenumber"
                            value={ibgenumber}
                            placeholder=""
                        />

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