import React, { useEffect, useState } from 'react'

import './styles.css'
import api from '../../services/api'

import Slider from "react-slick";

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import Search from '../../components/Search'

export default function Home() {
    const [banners, setBanners] = useState([])

    useEffect(async () => {
        const request = await api.get('/api/home/banners')
        setBanners(request.data)
        console.log(request)
    }, [])

    const settingsBanner = {
        autoplay: true,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const settingsCard = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 965,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 760,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <NavBar />

            <div className='container'>
                <header className='banner-wrapper'>
                    <Slider {...settingsBanner}>
                        {banners.map(banner =>
                            <div>
                                <img src={banner} alt="Banner" />
                            </div>)
                        }
                    </Slider>
                </header>

                <Search />

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Destaques</h1>
                    </div>

                    <div className="wrapper-inner grid-3">
                        <Card className="card-large" title="Título do Anúcio 1s dsds dsd" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                        <Card className="card-large" title="Título do Anúcio 2" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                        <Card className="card-large" title="Título do Anúcio 3" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                    </div>
                </section>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Últimos Anúncios Realizados</h1>
                    </div>
                    <div className='wrapper-inner'>
                        <Slider {...settingsCard}>
                            <Card className="card-small" price="R$ 10.000,00" />
                            <Card className="card-small" price="R$ 10.000,00" />
                            <Card className="card-small" price="R$ 10.000,00" />
                            <Card className="card-small" price="R$ 10.000,00" />
                            <Card className="card-small" price="R$ 10.000,00" />
                            <Card className="card-small" price="R$ 10.000,00" />
                            <Card className="card-small" price="R$ 10.000,00" />
                        </Slider>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}