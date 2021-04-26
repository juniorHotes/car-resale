import React, { useEffect } from 'react'
import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search'

export default function Results(props) {

    useEffect(async () => {
        console.log(props)

        await api.get("/api/advertisement/filter", {
            "filter": "JETTA",
            "brand": "",
            "model": "",
            "minPrice": 0,
            "maxPrice": 0,
            "maxKm": 0,
            "minYear": 0,
            "maxYear": 0,
            "optional": [],
            "searchType": "basic"
        }).then(e => e.json()).then(req => {
            console.log(req)
        }).catch(err => err)

    }, [])
    return (
        <>
            <div className='container'>
                <NavBar />

                <div className="search__container">
                    <Search />
                </div>

                <Footer />
            </div>
        </>
    )
}