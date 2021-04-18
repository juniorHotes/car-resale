import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import logoIcon from '../../assets/img/icons/logo.png'

export default function NavBar() {
    return (
        <nav className='nav-container'>
            <div className='wrapper nav__wrapper'>
                <div className='logo-wrapper'>
                    <Link to="#">
                        <img src={logoIcon} alt="logo" />
                    </Link>
                </div>
                <div className='nav-wrapper'>
                    <ul>
                        <li><Link to="http://">Anunciar</Link></li>
                        <li><Link to="http://">Cadastrar-se</Link></li>
                        <li><Link to="http://">Entrar</Link></li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}