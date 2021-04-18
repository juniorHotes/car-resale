import React from 'react'

import './styles.css'

import Slider from "react-slick";

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import HomeSearch from '../../components/HomeSearch'

import banner1 from '../../assets/img/banner-1.png'
import banner2 from '../../assets/img/banner-2.png'
import banner3 from '../../assets/img/banner-3.png'

export default function Home() {

    const settingsBanner = {
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const settingsCard = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <>
            <NavBar />
            <div className='container'>
                <header className='banner-wrapper'>
                    <Slider {...settingsBanner}>
                        <div>
                            <img src={banner1} alt="Banner" />
                        </div>
                        <div>
                            <img src={banner2} alt="Banner" />
                        </div>
                        <div>
                            <img src={banner3} alt="Banner" />
                        </div>
                    </Slider>
                </header>

                <HomeSearch />

                <section className='section-wrapper'>
                    <div className='title-container'>
                        <h1>Destaques</h1>
                    </div>
                    <div className='draft-wrapper'>
                        <Slider {...settingsCard}>
                            <Card title="Título do Anúcio 1s dsds dsd" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                            <Card title="Título do Anúcio 2" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                            <Card title="Título do Anúcio 3" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                            <Card title="Título do Anúcio 4 " price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                            <Card title="Título do Anúcio 5" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                            <Card title="Título do Anúcio 6" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                            <Card title="Título do Anúcio 7" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                        </Slider>
                    </div>
                </section>
                <section className='section-wrapper grid-3'>
                    <Card className="card-large" title="Título do Anúcio 1s dsds dsd" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                    <Card className="card-large" title="Título do Anúcio 2" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                    <Card className="card-large" title="Título do Anúcio 3" price="R$ 10.000,00" yar="2001" info="15.000km, Automático, Gasolina" />
                </section>
            </div>

            <Footer />
        </>
    )
}