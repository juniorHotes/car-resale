import React from 'react'
import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import profileIcon from '../../assets/img/icons/default_user.svg'
import exemple from '../../assets/img/1-335x186.jpg'

export default function Details() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <div className="container-images">
                    <div className="img-wrapper">
                        <img src={exemple} alt="" />
                    </div>
                    <div className="img-wrapper">
                        <img src={exemple} alt="" />
                    </div>
                    <div className="img-wrapper">
                        <img src={exemple} alt="" />
                    </div>
                </div>

                <section className="info-container">
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
                                <div>
                                    <span>(98) 91234-5678</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-optional">
                        <div className="sheet-wrapper">
                            <div className="car-price">
                                <h3>R$ 10.000,00</h3>
                            </div>
                            <div className="sheet-list-wrapper">

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}