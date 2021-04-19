import React, { useEffect, useState, useRef } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

export default function Login() {
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
                        <h3>Entre com seu usuário</h3>
                    </div>

                    <Form onSubmit={handleSubmit} ref={formRef}>

                        <Input
                            label="Forneça seu e-mail"
                            type="text"
                            name="email"
                            placeholder="Ex: email@email.com"
                        />
                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            placeholder="********"
                        />

                        <button
                            className="btn btn-secundary"
                            type="submit"
                            style={{float: 'right'}}
                        >
                            Entrar
                        </button>
                    </Form>

                </div>
            </div>
            <Footer />
        </>
    )
}