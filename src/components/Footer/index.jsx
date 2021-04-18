import React from 'react'
import  { Link } from 'react-router-dom'

import './styles.css'

import logoIcon from '../../assets/img/icons/logo.png'

export default function Footer() {
    return (
        <div className='footer-container'>
            <div className='wrapper footer-wrapper'>
                <div className='footer-icon-wrapper'>
                    <img src={logoIcon} alt="Incone Shop Auto" />
                </div>
                <div className='about-wrapper'>
                    <h3>A Viaki Motors, empresa regional desenvolvida em conjunto com designers e programadores, surge com objetivo de conectar o comercio automotivo do Brasil.</h3>
                </div>
                <div className='menu-footer-container'>
                    <ul>
                        <li><Link to='' >Politicas</Link></li>
                        <li><Link to='' >Fale Conosco</Link></li>
                        <li><Link to='' >Sobre Nós</Link></li>
                        <li><Link to='' >FAQ</Link></li>
                    </ul>
                </div>
                <div className='populated-wrapper'>
                    <div>
                        <Link to="#" id="tel" title='Telefone'>+55 (98) 91234-5678</Link>
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