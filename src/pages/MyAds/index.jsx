import React, { useEffect, useState } from 'react'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function MyAds(props) {
    const [data, setdata] = useState([])

      return (
        <>
            <NavBar />

            <div className='container'>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Meus Anúncios</h1>
                    </div>

                </section>
                
            </div>

            <Footer />
        </>
    )
}