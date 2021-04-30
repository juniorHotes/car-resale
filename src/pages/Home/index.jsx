import React, { useEffect, useState } from 'react'

import './styles.css'
import api from '../../services/api'

import Slider from "react-slick";

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import Search from '../../components/Search'

export default function Home(props) {
    const [banners, setBanners] = useState([])

    useEffect(async () => {
        const request = await api.get('/api/home/banners')
        setBanners(request.data)
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
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 865,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 660,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2
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

                <Search parentProps={props} location={props.location.pathname}/>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Destaques</h1>
                    </div>

                    <div className="wrapper-inner grid-3">
                        {[...Array(3)].map((_, idx) =>
                            <Card
                                key={idx}
                                id={idx}
                                image={''}
                                title={'Título do anúcio ' + idx}
                                price={2600000}
                                year={'2010'}
                                km={46000}
                            />
                        )}
                    </div>
                </section>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Últimos Anúncios Realizados</h1>
                    </div>
                    <div className='wrapper-inner'>
                        <Slider {...settingsCard}>
                            {[...Array(6)].map((_, idx) =>
                                <Card
                                    className="card-small"
                                    key={idx}
                                    id={idx}
                                    image={''}
                                    price={2600000}
                                />
                            )}
                        </Slider>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}