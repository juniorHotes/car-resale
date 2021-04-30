import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import logoIcon from '../../assets/img/icons/Vazado.png'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function NavBar() {
    const [logged, setLogged] = useState(false)

    const elemSelect = useRef(null)


    useEffect(() => {
        const session = sessionStorage.getItem('token')

        if (session) {
            setLogged(true)
        } else {
            setLogged(false)
        }

        M.FormSelect.init(elemSelect.current);
        console.log(elemSelect.current)

    }, [])

    return (
        <nav className='nav-container'>
            <div className='wrapper nav__wrapper'>
                <div className='logo-wrapper'>
                    <Link to="/">
                        <img width="200px" src={logoIcon} alt="logo" />
                    </Link>
                </div>
                <div className='nav-wrapper'>

                    <div id="mobile-button">
                        <a href="#!" className="dropdown-trigger" data-target="dropdown1"><i className="material-icons" >dehaze</i></a>
                    </div>

                    <ul id="web-list">
                        <li><Link to="/announce">Anunciar</Link></li>
                        <li><Link to="/newuser">Cadastrar-se</Link></li>
                        <li>
                            <Link
                                to={logged ? '' : '/login'}
                                onClick={() => logged && sessionStorage.removeItem('token')}
                            >
                                {logged ? 'Sair' : 'Entrar'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}