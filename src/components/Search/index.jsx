import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import api from '../../services/api'

import './styles.css'

import Input from '../Form/Input'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function Search() {
    const history = useHistory()

    const searchContainer = useRef(null)
    const elemSelect = useRef(null)

    const [changeText, setFilter] = useState(false)
    const [selectValues, setSelectValues] = useState([])
    const [optional, setOptional] = useState([])

    useEffect(async () => {
        const request = await api('/api/optional')
        setOptional(request.data)
    }, [])

    useEffect(() => {
        M.FormSelect.init(elemSelect.current);
        setSelectValues(elemSelect.current)
    }, [optional])

    function handleSubmit(data) {
        const basicSearch = data.filter

        if (basicSearch != undefined || basicSearch == '') {
            console.log(data)
            history.push('/api/advertisement/filter?searchType=basic', data)
        } else {
            const optional = selectValues.M_FormSelect.getSelectedValues()
            console.log({ ...data, optional })
            history.push('/api/advertisement/filter?searchType=complete', { ...data, optional })
        }
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
                                name="filter"
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
                                    name="brand"
                                    placeholder="Marca"
                                />
                                <Input
                                    inputSearch="search-input"
                                    type="text"
                                    name="model"
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
                                        name="minYear"
                                        placeholder="Ano mínimo"
                                    />
                                    <Input
                                        inputSearch="search-input"
                                        type="text"
                                        name="maxYear"
                                        placeholder="Ano máximo"
                                    />
                                </div>
                                <div>
                                    <Input
                                        inputSearch="search-input"
                                        input
                                        type="text"
                                        name="minPrice"
                                        placeholder="Preco mínimo"
                                    />
                                    <Input
                                        inputSearch="search-input"
                                        type="text"
                                        name="maxPrice"
                                        placeholder="Preco máximo"
                                    />
                                </div>
                            </div>
                            <div id="advaced-search-g3">
                                <div className="input-field col s12">
                                    <select multiple ref={elemSelect}>
                                        <option value="" selected disabled>Opcionais</option>
                                        {optional.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
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