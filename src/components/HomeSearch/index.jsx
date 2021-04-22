import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import api from '../../services/api'

import './styles.css'

import Input from '../Form/Input'

export default function HomeSearch(props) {
    const searchContainer = useRef(null)

    useEffect(() => {
        console.log(searchContainer)
    }, [])

    return (
        <div className="wrapper">
            <div className="search-wrapper">
                <div className="search-container" ref={searchContainer}>
                    <div className="basic-search-wrapper">
                        <Form>
                            <Input
                                inputSearch="search-input"
                                input
                                type="text"
                                name="search"
                                placeholder="Pesquise por marca, modelo ou preço"
                            />

                            <input
                                className="btn btn-large"
                                inputSearch="search-button"
                                type="submit"
                                value=""
                            />

                        </Form>

                    </div>
                    <div className="advanced-button-wrapper">
                        <button className="waves-effect waves-teal btn-flat"
                            onClick={e => e.target.ownerDocument.activeElement.firstElementChild.classList.toggle('drop_down')}
                        >
                            Filtros Avançados
                            <i className="material-icons arrow_drop_down">arrow_drop_down</i>
                        </button>
                    </div>
                    <div className="advaced-search-wrapper">
                        <Form>
                            <Input
                                inputSearch="search-input"
                                input
                                type="text"
                                name="marca"
                                placeholder="Marca"
                            />
                            <Input
                                inputSearch="search-input"
                                type="text"
                                name="modelo"
                                placeholder="Modelo"
                            />
                            <Input
                                inputSearch="search-input"
                                type="text"
                                name="potencia"
                                placeholder="Potencia"
                            />

                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}