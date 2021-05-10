import React, { useEffect, useState } from 'react'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search'
import Card from '../../components/Card'
import PreloadCircle from '../../components/PreloadCircle'

export default function Results(props) {
    const [data, setdata] = useState([])
    const [preload, setPreload] = useState(true)

    useEffect(() => {
        if (data.length != 0)
            setPreload(false)
    }, [data])

    // O resultado da pesquisa vem do componente Search
    function setSearchQuery(d) {
        setdata(d)
    }

    return (
        <>
            <NavBar />

            <div className='container'>

                <div className="search__container">
                    <Search parentProps={props} searchQuery={setSearchQuery} />
                </div>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Resultados</h1>
                    </div>
<<<<<<< HEAD

                    <PreloadCircle preload={preload} />

                    {
                        preload ? null : data.length == 0
                            ? <h2 style={{ textAlign: 'center' }}>Não encontramos resultados</h2>
                            : null
                    }
=======
                    
                    {data.length === 0 ? <h2 style={{ textAlign: 'center' }}>Não encontramos resultados</h2> : null}
>>>>>>> 1de304840d64f928a5d4f50428a4fe24b6a54233

                    <div className="results-container">
                        {
                            data.map(item =>
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