import React, { useEffect } from 'react'
import api from '../../services/api'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search'

export default function Results(props) {

    useEffect(async () => {
        console.log(props)

        async function decodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }



        // await api.get(props.location.pathname)
        //     .then(e => e.json())
        //     .then(req => {
        //         const { }
        //     }).catch(err => err)

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