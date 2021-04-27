import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import logoIcon from '../../assets/img/icons/Vazado.png'

export default function Footer() {
    return (
        <div className='footer-container'>
            <div className='wrapper footer-wrapper'>
                <div className='menu-footer-container'>
                    <ul>
                        <li><Link to='' >Politicas</Link></li>
                        <li><Link to='' >Fale Conosco</Link></li>
                        <li><Link to='' >Sobre Nós</Link></li>
                        <li><Link to='' >FAQ</Link></li>
                    </ul>
                </div>

                <div>
                    <div className='footer-icon-wrapper'>
                        <img src={logoIcon} alt="Incone Shop Auto" />
                    </div>
                    <div className='about-wrapper'>
                        <h3>A Viaki Motors, empresa regional desenvolvida em conjunto com designers e programadores, surge com objetivo de conectar o comercio automotivo do Brasil.</h3>
                    </div>
                </div>
                <div className='populated-wrapper'>
                    <div className="phone-wrapper">
                        <a href="https://web.whatsapp.com/send?phone=555384696515" target="_blanck" id="tel" title='Telefone'>
                            <div>
                                <div>
                                    <span>+55 (98) 91234-5678</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div>
                        <Link to="#" id='email' title='Email'>email@email.com.br</Link>
                    </div>
                    <div className="addres-wrapper">
                        <div>
                            <Link to="#" id='addres' title='Endereço'>
                                <span>
                                    RUA CICLANA 255
                                    CEP: 12345-123
                                    PARNAÍBA
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}