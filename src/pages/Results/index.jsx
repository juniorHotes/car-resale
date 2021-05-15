import React, { useEffect, useState } from 'react'

import './styles.css'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search'
import Card from '../../components/Card'
import PreloadCircle from '../../components/PreloadCircle'

export default function Results(props) {
    const [data, setdata] = useState([])
    const [dataError, setDataError] = useState(false)

    const [preload, setPreload] = useState(true)

    useEffect(() => {
        if (dataError)
            setPreload(false)
    }, [dataError])

    // O resultado da pesquisa vem do componente Search
    function setSearchQuery(data) {
        setdata(data)
        setPreload(false)
    }

    function setSearchQueryError(isError) {
        setDataError(isError)
    }

    function isSetPreload(p) {
        setPreload(p)
    }

    return (
        <>
            <NavBar />

            <div className='container'>

                <div className="search__container">
                    <Search
                        isPreload={isSetPreload}
                        parentProps={props}
                        searchQuery={setSearchQuery}
                        searchQueryError={setSearchQueryError}
                    />
                </div>

                <section className='section-wrapper'>
                    <div className='title-section'>
                        <h1>Resultados</h1>
                    </div>

                    <PreloadCircle preload={preload} />

                    {dataError ? <h2 style={{ textAlign: 'center' }}>Erro ao buscar resultados</h2> : null}

                    {
                        preload ? null : data.length === 0
                            ? <h2 style={{ textAlign: 'center' }}>Não encontramos resultados</h2>
                            : null
                    }

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
                            )
                        }
                    </div>

                </section>

                <ul className="pagination">
                    <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                    <li className="active"><a href="#!">1</a></li>
                    <li className="waves-effect"><a href="#!">2</a></li>
                    <li className="waves-effect"><a href="#!">3</a></li>
                    <li className="waves-effect"><a href="#!">4</a></li>
                    <li className="waves-effect"><a href="#!">5</a></li>
                    <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                </ul>

            </div>

            <Footer />
        </>
    )
}