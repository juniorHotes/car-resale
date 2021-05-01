import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import logoIcon from '../../assets/img/icons/Vazado.png'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function NavBar() {
    const [logged, setLogged] = useState(false)

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
            <div class="navbar-fixed">
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
                                        to={logged ? '' : '/login'}
                                        onClick={() => {
                                            window.location.href = "#top"
                                            setLogged(false)
                                            return logged && sessionStorage.removeItem('token')
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
                        <Link to="/announce">Anunciar</Link>
                    </li>
                    <li>
                        <Link to="/newuser">Cadastrar-se</Link>
                    </li>
                    <li>
                        <Link
                            to={logged ? '' : '/login'}
                            onClick={() => logged && sessionStorage.removeItem('token')}
                        >
                            {logged ? 'Sair' : 'Entrar'}
                        </Link>
                    </li>

                </div>
            </ul>
        </>
    )
}