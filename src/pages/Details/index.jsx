import React, { useEffect, useRef } from 'react'
import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import profileIcon from '../../assets/img/icons/default_user.svg'
import whatsapp from '../../assets/img/icons/whatsapp.svg'

import exemple1 from '../../assets/img/exemple_details-1.jpg'
import exemple2 from '../../assets/img/exemple_details-2.jpg'
import exemple3 from '../../assets/img/exemple_details-3.jpg'

// Import Materialize
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function Details() {
    const carousel = useRef(null)

    useEffect(() => {
        M.Carousel.init(carousel.current);
    })

    return (
        <>
            <NavBar />

            <div className='container'>
                <div className="container-carousel">
                    <div className="carousel" ref={carousel}>
                        <a className="carousel-item" href="#one!"><img src={exemple1} /></a>
                        <a className="carousel-item" href="#two!"><img src={exemple2} /></a>
                        <a className="carousel-item" href="#three!"><img src={exemple3} /></a>
                    </div>
                </div>

                <section className="info-container">
                    <div>
                        <div className="info-header">
                            <h2>MITSUBISHI PAJERO TR4</h2>
                        </div>

                        <div className="infor-wrapper">
                            <div className="info">
                                <span>Marca</span>
                                <h3>Ford</h3>
                            </div>
                            <div className="info">
                                <span>Modelo</span>
                                <h3>KA</h3>
                            </div>
                            <div className="info">
                                <span>Ano</span>
                                <h3>2004/2016</h3>
                            </div>
                            <div className="info">
                                <span>Km</span>
                                <h3>24.000,00km</h3>
                            </div>
                            <div className="info">
                                <span>Potencia</span>
                                <h3>1.0</h3>
                            </div>

                        </div>

                        <div className="description-wrapper">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Odio aenean sed adipiscing diam donec adipiscing</p>
                        </div>

                        <div className="profile-container">
                            <div className="profile-wrapper">
                                <img width='100%' src={profileIcon} alt="Foto de Perfil" />
                            </div>
                            <div className="contact-wrapper">
                                <div className="profile-name">
                                    <h3>Arnaldo Junior</h3>
                                </div>
                                <div className="profile-contact">

                                    <div>
                                        <span>email@email.com</span>
                                    </div>

                                    <a href="https://web.whatsapp.com/send?phone=555384696515" target="_blanck" id="tel" title='Telefone'>
                                        <div className="profile-phone-wrapper">
                                            <div className="profile-phone">
                                                <span>(98) 91234-5678</span>
                                            </div>
                                            <img width="50" src={whatsapp} title="Whatsapp" rel="Whatsapp" />
                                        </div>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-optional">
                            <div className="sheet-wrapper">
                                <div className="car-price">
                                    <h3>R$ 10.000,00</h3>
                                </div>
                                <div className="sheet-list-wrapper">
                                    <ul className="sheet-item">
                                        <li>Opcional 1</li>
                                        <li>Opcional 2</li>
                                        <li>Opcional 3</li>
                                        <li>Opcional 4</li>
                                        <li>Opcional 5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <Footer />
        </>
    )
}