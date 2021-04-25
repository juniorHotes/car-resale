import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import api from '../../services/api'

import './styles.css'

import Input from '../Form/Input'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function HomeSearch(props) {
    const searchContainer = useRef(null)
    const elemSelect = useRef(null)

    const [changeText, setFilter] = useState(false)
    const [selectValues, setSelectValues] = useState([])

    useEffect(() => {
        M.FormSelect.init(elemSelect.current);
        setSelectValues(elemSelect.current)
    })

    function handleSubmit(data) {
        const optional = selectValues.M_FormSelect.getSelectedValues().join()
        console.log({ ...data, optional })
    }

    return (
        <div className="wrapper">
            <div className="search-wrapper">
                <div className="search-container" ref={searchContainer}>
                    <div className="basic-search-wrapper">

                        <Form onSubmit={handleSubmit}>
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
                        <button className="btn-flat"
                            onClick={() => {
                                setFilter(!changeText)
                                return searchContainer.current.classList.toggle('drop_down')
                            }}
                        >
                            {changeText ? 'Filtro Básico' : 'Filtros Avançados'}

                            <i className="material-icons arrow_drop_down">arrow_drop_down</i>
                        </button>
                    </div>
                    <div className="advaced-search-wrapper">
                        <Form onSubmit={handleSubmit}>
                            <div id="advaced-search-g1">
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

                            </div>
                            <div id="advaced-search-g2">
                                <div>
                                    <Input
                                        inputSearch="search-input"
                                        input
                                        type="text"
                                        name="ano-min"
                                        placeholder="Ano minimo"
                                    />
                                    <Input
                                        inputSearch="search-input"
                                        type="text"
                                        name="ano-max"
                                        placeholder="Ano maximo"
                                    />
                                </div>
                                <div>
                                    <Input
                                        inputSearch="search-input"
                                        input
                                        type="text"
                                        name="preco-min"
                                        placeholder="Preco minimo"
                                    />
                                    <Input
                                        inputSearch="search-input"
                                        type="text"
                                        name="preco-max"
                                        placeholder="Preco maximo"
                                    />
                                </div>
                            </div>
                            <div id="advaced-search-g3">
                                <div className="input-field col s12">
                                    <select multiple ref={elemSelect}>
                                        <option selected disabled>Opcionais</option>
                                        <option >Option 1</option>
                                        <option >Option 2</option>
                                        <option >Option 3</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" id="btn-advaced-search" className="btn btn-big">Pesquisar</button>
                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}