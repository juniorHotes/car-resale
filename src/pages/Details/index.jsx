import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import api from '../../services/api'
import useMoneyFormat from '../../hooks/useMoneyFormat'

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

export default function Details(props) {
    const carousel = useRef(null)
    const moneyFormat = useMoneyFormat
    const [advertisement, setAdvertisement] = useState([])

    useEffect(async () => {
        M.Carousel.init(carousel.current);

        const reqAdvertisement = (await api.get(`/api/advertisement/${props.match.params.id}`)).data
        setAdvertisement(reqAdvertisement)
        console.log(reqAdvertisement)

    }, [])

    useEffect(async () => {
        if(carousel == null) return
        M.Carousel.init(carousel.current);
    }, [carousel])


    return (
        <>
            <NavBar />

            <div className='container'>
                <div className="container-carousel">
                    {advertisement.images &&
                        <div className="carousel" ref={carousel}>
                            {advertisement.images && advertisement.images.map((image, idx) =>
                                <a key={idx} className="carousel-item" href="#">
                                    <img src={`data:image/png;base64,${image}`} />
                                </a>
                            )}
                        </div>
                    }
                </div>

                <section className="info-container">
                    <div>
                        <div className="info-header">
                            <h2>{advertisement.title}</h2>
                        </div>

                        <div className="infor-wrapper">
                            <div className="info">
                                <span>Marca</span>
                                <h3>{advertisement.brand}</h3>
                            </div>
                            <div className="info">
                                <span>Modelo</span>
                                <h3>{advertisement.model}</h3>
                            </div>
                            <div className="info">
                                <span>Ano</span>
                                <h3>{advertisement.year}</h3>
                            </div>
                            <div className="info">
                                <span>Km</span>
                                <h3>{advertisement.km}</h3>
                            </div>
                            <div className="info">
                                <span>Potencia</span>
                                <h3>{advertisement.potence}</h3>
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
                                    <h3>{moneyFormat(advertisement.price)}</h3>
                                </div>
                                <div className="sheet-list-wrapper">
                                    <ul className="sheet-item">
                                        {advertisement.optionals && advertisement.optionals.map(item =>
                                            <li key={item.id}>{item.name}</li>
                                        )}
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