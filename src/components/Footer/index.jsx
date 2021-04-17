import React from 'react'
import './styles.css'

import logoIcon from '../../assets/img/icons/logo.png'

export default function Footer() {
    return (
        <div className='footer-container'>
            <div className='container footer-wrapper'>
                <div className='footer-icon-wrapper'>
                    <img src={logoIcon} alt="Incone Shop Auto" />
                </div>
                <div className='about-wrapper'>
                    <h3>A Viaki Motors, empresa regional desenvolvida em conjunto com designers e programadores, surge com objetivo de conectar o comercio automotivo do Brasil.</h3>
                </div>
                <div className='menu-footer-container'>
                    <ul>
                        <li><a href='' >Politicas</a></li>
                        <li><a href='' >Fale Conosco</a></li>
                        <li><a href='' >Sobre Nós</a></li>
                        <li><a href='' >FAQ</a></li>
                    </ul>
                </div>
                <div className='populated-wrapper'>
                    <div>
                        <a href="#" id="tel" title='Telefone'>+55 (98) 91234-5678</a>
                    </div>
                    <div>
                        <a href="#" id='email' title='Email'>email@email.com.br</a>
                    </div>
                    <div className="addres-wrapper">
                        <div>
                            <a href="#" id='addres' title='Endereço'>
                                <span>
                                    RUA CICLANA 255
                                    CEP: 12345-123
                                    PARNAÍBA
                                </span>
                            </a>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}