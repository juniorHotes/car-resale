import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search'
import Card from '../../components/Card'

export default function Results(props) {
    const [data, setdata] = useState([])

    useEffect(async () => {
        console.log(props)

        await api.post(props.location.pathname, {
            "filter": "filtro aberto - este campo é levado em consideração se a busca for basic",
            "brand": "vw",
            "model": "jetta",
            "minPrice": 0,
            "maxPrice": 50000,
            "maxKm": 100000,
            "minYear": 2010,
            "maxYear": 2021,
            "optional": [
                "c44eccb8-a1eb-42f8-8e03-48f0701ea3a8",
                "86110546-f27f-4d9b-9d4f-559eaa962adb",
                "2c4d1a7c-075f-4692-ac9f-1bd6756ed8f4"
            ],
            "searchType": "complete"
        }).then(req => {
            setdata(req.data)
            console.log(req.data)
        }).catch(err => err)

    }, [])
    return (
        <>
            <NavBar />

            <div className='container'>

                <div className="search__container">
                    <Search />
                </div>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Resultados</h1>
                    </div>

                    <div className="results-container">
                        {data.map(item =>
                            <Card
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                year={item.year}
                                km={item.km}
                            />
                        )}
                    </div>

                </section>
            </div>

            <Footer />
        </>
    )
}