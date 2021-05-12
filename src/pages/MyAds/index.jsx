import React, { useEffect, useState, useRef, useContext } from 'react'
import { ModalContext } from '../../App'

import './styles.css'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import CardHorizontal from '../../components/CardHorizontal'
import PreloadCircle from '../../components/PreloadCircle'

// Import Materialize
import M from "materialize-css";

export default function MyAds() {
    const tabRef = useRef(null)
    const { openModal } = useContext(ModalContext)

    const [myAds, setMyAds] = useState([])
    const [myAdsActive, setMyAdsActive] = useState([])
    const [myAdsInactive, setMyAdsInactive] = useState([])
    const [myAdsHighlight, setMyAdsHighlight] = useState([])

    const [preload, setPreload] = useState(true)
    const [reload, setReload] = useState(false)

    function handleReload() {
        setReload(!reload)
    }

    useEffect(async () => {
        const token = sessionStorage.getItem('token')

        if (!token) {
            openModal('Acesso negado', 'Você não possue permissão de acesso, tente fazer login novamente')
            return
        }

        const options = {
            headers: {
                Authorization: 'Bearer ' + token
            },
        };

        const reqAds = await api.get('/api/advertisement', options)
            .then(request => {
                setPreload(false)
                return request.data
            }).catch(err => {
                openModal("Erro", "Erro ao carregar anúcios")
            })

        setMyAds(reqAds)
    }, [reload])

    useEffect(() => {
        M.Tabs.init(tabRef.current, { swipeable: true });
    }, [])

    useEffect(() => {
        if(myAds.length === 0) return

        setMyAdsActive(myAdsIsActive())
        setMyAdsInactive(myAdsIsInactive())
        setMyAdsHighlight(myAdsIsHighlight())
    }, [myAds])

    function myAdsIsActive() {
        return myAds.filter(item => item.active === true)
    }

    function myAdsIsInactive() {
        return myAds.filter(item => item.active === false)
    }

    function myAdsIsHighlight() {
        return myAds.filter(item => item.highlight === true)
    }

    const keyGenerator = () => (Math.random() * 0xFFFFFF << 0).toString(16)

    return (
        <>
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
                                    <a href="#swipe-1">ATIVOS ({myAdsActive.length})</a>
                                </li>
                                <li className="tab col s3">
                                    <a href="#swipe-2">INATIVOS ({myAdsInactive.length})</a>
                                </li>
                                <li className="tab col s3">
                                    <a href="#swipe-3">DESTACADOS ({myAdsHighlight.length})</a>
                                </li>
                            </ul>
                        </div>

                        <PreloadCircle preload={preload} />

                        <div id="swipe-1" className="col s12">
                            {myAdsActive.map(ads =>
                                <CardHorizontal
                                    key={keyGenerator()}
                                    id={ads.id}
                                    image={ads.image}
                                    title={ads.title}
                                    brand={ads.brand}
                                    model={ads.model}
                                    price={ads.price}
                                    register={ads.register}
                                    validThrue={ads.validThrue}
                                    reload={handleReload}
                                    isActive={true}
                                    isPreload={setPreload}
                                />
                            )}
                        </div>

                        <div id="swipe-2" className="col s12">
                            {myAdsInactive.map(ads =>
                                <CardHorizontal
                                    key={keyGenerator()}
                                    id={ads.id}
                                    image={ads.image}
                                    title={ads.title}
                                    brand={ads.brand}
                                    model={ads.model}
                                    price={ads.price}
                                    register={ads.register}
                                    validThrue={ads.validThrue}
                                    reload={handleReload}
                                    isActive={false}
                                    isPreload={setPreload}
                                />
                            )}
                        </div>

                        <div id="swipe-3" className="col s12">
                            {myAdsHighlight.map(ads =>
                                <CardHorizontal
                                    key={keyGenerator()}
                                    id={ads.id}
                                    image={ads.image}
                                    title={ads.title}
                                    brand={ads.brand}
                                    model={ads.model}
                                    price={ads.price}
                                    register={ads.register}
                                    validThrue={ads.validThrue}
                                    reload={handleReload}
                                    isPreload={setPreload}
                                />
                            )}
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