import React, { useRef } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

export default function NewUser() {
    const formRef = useRef(null);

    async function handleSubmit(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Digite um e-mail válido")
                    .required("O e-mail é obrigatório"),

                password: Yup.string().required("Forneça sua senha por favor")
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

    return (
        <>
            <NavBar />
            <div className='container'>
                <div className="form-content">
                    <div className="form-title">
                        <h3>Faça seu cadastro</h3>
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
                            label="CEP"
                            type="text"
                            name="cep"
                            placeholder="Ex: 12345789"
                        />

                        <Input
                            label="Estado"
                            type="text"
                            name="state"
                            placeholder=""
                        />

                        <Input
                            label="Cidade"
                            type="text"
                            name="city"
                            placeholder=""
                        />

                        <Input
                            label="Rua"
                            type="text"
                            name="street"
                            placeholder=""
                        />

                        <Input
                            label="Região"
                            type="text"
                            name="region"
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
                            placeholder=""
                        />

                        <Input
                            label="Telefone com DDD"
                            type="tel"
                            name="phone"
                            placeholder=""
                        />

                        <button
                            className="btn btn-secundary"
                            type="submit"
                            style={{ float: 'right' }}
                        >
                            Cadastrar
                        </button>
                    </Form>

                </div>
            </div>
            <Footer />
        </>
    )
}