import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import logoIcon from '../../assets/img/icons/CarangaVazado.svg'

export default function NavBar() {
    return (
        <nav className='nav-container'>
            <div className='wrapper'>
                <div className='nav-wrapper'>
                    <Link to="/" className="left brand-logo">
                        <img height="190px" src={logoIcon} alt="Logo" />
                    </Link>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/announce">Anunciar</Link></li>
                        <li><Link to="/newuser">Cadastrar-se</Link></li>
                        <li><Link to="/Login">Entrar</Link></li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}