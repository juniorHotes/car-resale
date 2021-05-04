import React, { useEffect, useState, useRef } from 'react'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

import imageNotFound from '../../assets/img/image_not_found.svg'

// Import Materialize
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function MyAds(props) {
    const tabRef = useRef(null)
    const [data, setdata] = useState([])

    useEffect(() => {
        M.Tabs.init(tabRef.current, { swipeable: true });
        console.log(tabRef)
    }, [])

    return (
        <>
            <NavBar />

            <div className='container'>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Meus Anúncios</h1>
                    </div>
                    <div class="row" id="card-myads">
                        <div class="col s12">
                            <ul id="tabs-swipe-demo" ref={tabRef} className="tabs">
                                <li className="tab col s3 active">
                                    <a href="#test-swipe-1">ATIVOS (0)</a>
                                </li>
                                <li className="tab col s3">
                                    <a href="#test-swipe-2">INATIVOS (0)</a>
                                </li>
                                <li className="tab col s3">
                                    <a href="#test-swipe-3">DESTACADOS (0)</a>
                                </li>
                            </ul>
                        </div>

                        <div id="test-swipe-1" className="col s12 blue">

                            <div class="col s12 m7">
                                <div class="card horizontal">
                                    <div class="card-image">
                                        <img src={imageNotFound} />
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">
                                            <h5>Título: Jetta Impecável</h5>
                                            <p>Marca: VW</p>
                                            <p>Modelo: Jetta</p>
                                        </div>
                                        <div class="card-action">
                                            <a href="#">This is a link</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id="test-swipe-2" className="col s12 red">Test 2</div>
                        <div id="test-swipe-3" className="col s12 green">Test 3</div>
                    </div>
                </section>

            </div>

            <Footer />
        </>
    )
}