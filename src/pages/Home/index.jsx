import React from 'react'
import NavBar from '../../components/NavBar'
import banner from '../../assets/img/banner.png'


export default function Home() {
    return (
        <>
            <NavBar />
            <header>
                <img src={banner} alt="Banner"/>
            </header>
        </>
    )
}