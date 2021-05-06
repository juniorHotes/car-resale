import React, { useEffect, useState, useRef } from 'react'

import './styles.css'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import CardHorizontal from '../../components/CardHorizontal'
import SkyLight from 'react-skylight'

import imageNotFound from '../../assets/img/image_not_found.svg'

// Import Materialize
import M from "materialize-css";

export default function MyAds(props) {
    const tabRef = useRef(null)
    const skyLightRef = useRef(null);

    const [dialogMsg, setDialogMsg] = useState(['', ''])
    const [myAds, setMyAds] = useState([])

    useEffect(async () => {
        const token = sessionStorage.getItem('token')

        if (!token) {
            setDialogMsg(['Acesso negado', 'Você não possue permissão de acesso, tente fazer login novamente'])
            skyLightRef.current.show()

            return
        }

        const options = {
            headers: {
                Authorization: 'Bearer ' + token
            },
        };

        const reqAds = (await api.get('/api/advertisement', options)).data
        setMyAds(reqAds)
    }, [])


    useEffect(() => {
        M.Tabs.init(tabRef.current, { swipeable: true });
    }, [])

    return (
        <>
            <SkyLight ref={skyLightRef}
                title={dialogMsg[0]} >
                {dialogMsg[1]}
            </SkyLight>

            <NavBar />

            <div className='container'>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Meus Anúncios</h1>
                    </div>
                    <div className="row" id="card-myads">

                        <div className="col s12">
                            <ul ref={tabRef} className="tabs">
                                <li className="tab col s3 active">
                                    <a href="#swipe-1">ATIVOS ({myAds.length})</a>
                                </li>
                                <li className="tab col s3">
                                    <a href="#swipe-2">INATIVOS (0)</a>
                                </li>
                                <li className="tab col s3">
                                    <a href="#swipe-3">DESTACADOS (0)</a>
                                </li>
                            </ul>
                        </div>

                        <div id="swipe-1" className="col s12">
                            {myAds.map(ads =>
                                <CardHorizontal
                                    key={ads.id}
                                    id={ads.id}
                                    image={ads.image}
                                    title={ads.title}
                                    brand={ads.brand}
                                    model={ads.model}
                                    price={ads.price}
                                    register={ads.register}
                                    validThrue={ads.validThrue}
                                />
                            )}
                        </div>
                        <div id="swipe-2" className="col s12">

                        </div>
                        <div id="swipe-3" className="col s12">
                            
                        </div>
                    </div>

                    <ul className="pagination">
                        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                        <li className="active"><a href="#!">1</a></li>
                        <li className="waves-effect"><a href="#!">2</a></li>
                        <li className="waves-effect"><a href="#!">3</a></li>
                        <li className="waves-effect"><a href="#!">4</a></li>
                        <li className="waves-effect"><a href="#!">5</a></li>
                        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                </section>

            </div>

            <Footer />
        </>
    )
}