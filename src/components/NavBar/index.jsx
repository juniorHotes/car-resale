import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import logoIcon from '../../assets/img/icons/Vazado.png'

export default function NavBar() {
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const session = sessionStorage.getItem('token')

        if (session) {
            setLogged(true)
        } else {
            setLogged(false)
        }
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
                    <ul>
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