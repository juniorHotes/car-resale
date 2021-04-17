import React from 'react'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import banner from '../../assets/img/banner.png'


export default function Home() {
    return (
        <>
            <NavBar />

            <div className='container'>
                <header className='banner-wrapper'>
                    <img src={banner} alt="Banner" />
                </header>

                <section className='section-wrapper'>
                    <div className='title-container'>
                        <h1>Destaques</h1>
                    </div>
                    <div className='draft-wrapper'>

                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}