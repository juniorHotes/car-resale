import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import api from '../../services/api'
import useMoneyFormat from '../../hooks/useMoneyFormat'
import useKmFormat from '../../hooks/useKmFormat'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import profileIcon from '../../assets/img/icons/default_user.svg'
import whatsapp from '../../assets/img/icons/whatsapp.svg'
import PreloadCircle from '../../components/PreloadCircle'

import imageNotFound from '../../assets/img/image_not_found.svg'

// Import Materialize
import M from "materialize-css";

export default function Details(props) {
    const carousel = useRef(null)
    const moneyFormat = useMoneyFormat
    const kmFormat = useKmFormat

    const [advertisement, setAdvertisement] = useState([])

    useEffect(async () => {
        const reqAdvertisement = (await api.get(`/api/advertisement/${props.match.params.id}`)).data
        setAdvertisement(reqAdvertisement)
    }, [])

    useEffect(async () => {
        if (carousel == null) return

        M.Carousel.init(carousel.current);
    }, [advertisement])

    function getImages(index) {
        if (advertisement.images) {
            if (advertisement.images[index]) {
                return `data:image/png;base64,${advertisement.images[index]}`
            } else {
                return imageNotFound
            }
        }
    }

    return (
        <>
            <NavBar />

            <div className='container'>
                { advertisement.length === 0 && <PreloadCircle preload={true} /> }

                <div className="container-carousel">
                    <div className="carousel" ref={carousel}>
                        
                        <a key={0} className="carousel-item" href="#">
                            <img src={getImages(0)} />
                        </a>
                        <a key={1} className="carousel-item" href="#">
                            <img src={getImages(1)} />
                        </a>
                        <a key={2} className="carousel-item" href="#">
                            <img src={getImages(2)} />
                        </a>

                        {advertisement.images && advertisement.images.map((image, idx) => {
                            if (idx > 2) {
                                return (
                                    <a key={idx} className="carousel-item" href="#">
                                        <img src={`data:image/png;base64,${image}`} />
                                    </a>
                                )
                            }
                        }
                        )}
                    </div>
                </div>

                <section className="info-container">
                    <div>
                        <div className="info-header">
                            <h2>{advertisement.title && advertisement.title.toUpperCase()}</h2>
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
                                <h3>{kmFormat(advertisement.km)}</h3>
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