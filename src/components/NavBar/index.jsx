import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import SkyLight from 'react-skylight'

import logoIcon from '../../assets/img/icons/Vazado.png'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function NavBar() {
    const history = useHistory()
    const skyLightRef = useRef(null);

    const [logged, setLogged] = useState(false)
    const [dialogMsg, setDialogMsg] = useState(['', ''])

    const sidenav = useRef(null)

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
            <SkyLight ref={skyLightRef}
                afterClose={() =>
                    setTimeout(() => {
                        setLogged(false)
                        history.push('/')
                    }, 500)
                }

                title={dialogMsg[0]} >
                {dialogMsg[1]}
            </SkyLight>

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
                                                setDialogMsg(['Você não está mais logado', ''])

                                                skyLightRef.current.show()
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
                                    setDialogMsg(['Você não está mais logado', ''])

                                    skyLightRef.current.show()
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