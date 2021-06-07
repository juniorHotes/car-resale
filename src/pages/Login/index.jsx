import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'
import { ModalContext } from '../../App'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

export default function Login({ location }) {
    const history = useHistory()
    const formRef = useRef(null);

    const { openModal } = useContext(ModalContext)
    const [preload, setPreload] = useState(false)

    useEffect(() => {
        if(location.state) {
            openModal("Cadastre-se ou faça login para acessar está sessão")
        }
        // eslint-disable-next-line
    }, [location.state])

    async function handleSubmit(data, { reset }) {
        formRef.current.setErrors({})
        
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

            setPreload(true)

            await api.post('/api/authorize', data)
                .then((promise) => {
                    reset()
                    setPreload(false)
                    openModal('Login feito com sucesso', '', () => setTimeout(() => { history.push('/my_ads') }, 500))

                    const { token } = promise.data
                    if (token) {
                        sessionStorage.setItem('token', token)
                    }

                }).catch(err => {
                    setPreload(false)
                    openModal('Erro ao fazer login', 'Erro ao entrar em contato com o servidor')
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
                            disabled={preload}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            placeholder="********"
                            disabled={preload}
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
                                Entrar
                            </button>
                        </div>

                    </Form>
                    <div id="footer-form">
                        <p>Não tem cadastro? </p>
                        <Link to="new_user">Faça seu cadastro aqui</Link>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}