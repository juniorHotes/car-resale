import React from 'react'
import './styles.css'

import logoIcon from '../../assets/img/icons/logo.png'
import faceBookIcon from '../../assets/img/icons/facebook.svg'
import instagramIcon from '../../assets/img/icons/instagram.svg'
import whatsappIcon from '../../assets/img/icons/whatsapp.svg'
import envelopeIcon from '../../assets/img/icons/envelope.svg'


export default function NavBar() {
    return (
        <nav className='nav-container'>
            <div className='container nav__wrapper'>
                <div className='logo-wrapper'>
                    <a href="#">
                        <img src={logoIcon} alt="logo" />
                    </a>
                </div>
                <div className='nav-wrapper'>
                    <ul>
                        <li className="dropdown">
                            <a href="#" className="dropbtn">Comprar</a>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#">Anunciar</a>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropbtn">Serviços</a>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>

                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropbtn">Mais</a>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='widget-container'>
                    <div className='social-icons-wrapper'>
                        <a href="#"><img src={faceBookIcon} alt="facebook" title="Facebook" /></a>
                        <a href="#"><img src={instagramIcon} alt="instagram" title="Instagram" /></a>
                        <a href="#"><img src={whatsappIcon} alt="whatsapp" title="Whatsapp" /></a>
                        <a href="#"><img src={envelopeIcon} alt="envelope" title="E-mail" /></a>
                    </div>
                </div>
            </div>
        </nav>

    )
}