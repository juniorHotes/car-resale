import React, { useEffect, useState, useRef, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ModalContext } from '../../App'
import './styles.css'

import logoIcon from '../../assets/img/icons/Vazado.png'

import M from "materialize-css";

export default function NavBar() {
    const history = useHistory()
    const sidenav = useRef(null)
    const { openModal } = useContext(ModalContext)

    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const session = sessionStorage.getItem('token')

        if (session) {
            setLogged(true)
        } else {
            setLogged(false)
        }

        M.Sidenav.init(sidenav.current);

    }, [])

    return (
        <>
            <div className="navbar-fixed">
                <nav>
                    <div className="wrapper">
                        <div className="nav-wrapper">

                            <Link to="/"
                                className="brand-logo"
                                onClick={() => window.location.href = "#top"}
                            >
                                <img width="110px" src={logoIcon} alt="logo" />
                            </Link>

                            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                                <i className="material-icons">menu</i>
                            </a>

                            {/* Nave para Web */}
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link to="/announce" onClick={() => window.location.href = "#top"}>Anunciar</Link>
                                </li>
                                <li>
                                    <Link
                                        to={logged ? '/my_ads' : '/new_user'}
                                        onClick={() => window.location.href = "#top"}
                                    >
                                        {logged ? 'Meus Anúncios' : 'Cadastrar-se'}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={logged ? '#' : '/login'}
                                        onClick={() => {
                                            window.location.href = "#top"
                                            if (logged) {
                                                sessionStorage.removeItem('token')
                                                openModal('Você não está mais logado', '', () => setTimeout(() => { history.push('/') }, 500))
                                            }
                                        }}
                                    >
                                        {logged ? 'Sair' : 'Entrar'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Nave para dispositivos moveis */}
            <ul className="sidenav" id="mobile-demo" ref={sidenav}>
                <div>
                    <li>
                        <Link to="/announce" onClick={() => window.location.href = "#top"}>Anunciar</Link>
                    </li>
                    <li>
                        <Link
                            to={logged ? '/my_ads' : '/new_user'}
                            onClick={() => window.location.href = "#top"}
                        >
                            {logged ? 'Meus Anúncios' : 'Cadastrar-se'}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={logged ? '#' : '/login'}
                            onClick={() => {
                                window.location.href = "#top"
                                if (logged) {
                                    sessionStorage.removeItem('token')
                                    openModal('Você não está mais logado', '', () => setTimeout(() => { history.push('/') }, 500))
                                }
                            }}
                        >
                            {logged ? 'Sair' : 'Entrar'}
                        </Link>
                    </li>
                </div>
            </ul>
        </>
    )
}