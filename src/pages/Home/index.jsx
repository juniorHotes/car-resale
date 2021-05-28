import React, { useEffect, useState } from 'react'
import './styles.css'

import api from '../../services/api'

import Slider from "react-slick";

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import Search from '../../components/Search'
import PreloadCircle from '../../components/PreloadCircle'

export default function Home(props) {
    const [banners, setBanners] = useState([])
    const [highligths, setHighLigths] = useState([])
    const [lastAds, setLastAds] = useState([])

    useEffect(() => {
        (async () => {
            const reqBanners = (await api.get('/api/home/banners')).data
            const reqHighligths = (await api.get('/api/home/highligths')).data
            const reqLastAds = (await api.get('/api/home/lastAds')).data

            setBanners(reqBanners)
            setHighLigths(reqHighligths)
            setLastAds(reqLastAds)
        })()
    }, [])

    // Slick banner settings
    const settingsBanner = {
        autoplay: true,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // Slick carousel settings
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
                        {banners.map((banner, idx) =>
                            <div key={idx}>
                                <img src={`data:image/png;base64,${banner}`} alt="Banner" />
                            </div>)
                        }
                    </Slider>
                </header>

                <Search parentProps={props} location={props.location.pathname} />

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Destaques</h1>
                    </div>

                    <div className="wrapper-inner grid-3">
                        {
                            highligths.length === 0 && <PreloadCircle preload={true} />
                        }

                        {highligths.map((item, idx) =>
                            idx > 3 && (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    image={item.images[0]}
                                    title={item.title}
                                    price={item.price}
                                    year={item.year}
                                    km={46000}
                                />
                            )
                        )}
                    </div>
                </section>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Últimos Anúncios Realizados</h1>
                    </div>
                    <div className='wrapper-inner'>
                        {
                            lastAds.length === 0 && <PreloadCircle preload={true} />
                        }

                        <Slider {...settingsCard}>
                            {lastAds.map((item, idx) =>
                                idx > 12 && (
                                    <Card
                                        className="card-small"
                                        key={item.id}
                                        id={item.id}
                                        image={item.images[0]}
                                        price={item.price}
                                    />
                                )
                            )}
                        </Slider>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}