import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import api from '../../services/api'
import useMoneyFormat from '../../hooks/useMoneyFormat'

import './styles.css'

import Input from '../Form/Input'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function Search() {
    const history = useHistory()

    const searchContainer = useRef(null)
    const elemSelect = useRef(null)

    const [changeText, setFilter] = useState(false)
    const [searchType, setSearchType] = useState('basic')

    const [optional, setOptional] = useState([])

    useEffect(async () => {
        const request = await api('/api/optional')
        setOptional(request.data)
    }, [])

    useEffect(() => {
        M.FormSelect.init(elemSelect.current);
        elemSelect.current.M_FormSelect.input.placeholder = "Selecione um ou mais opcionais"
    }, [optional])

    async function handleSubmit(data) {
        const minPrice = data.minPrice.split(".")
        console.log(minPrice)
        console.log({ 
            ...data, 

            searchType: searchType,
            optional: elemSelect.current.M_FormSelect.getSelectedValues() })

        // history.push('/api/advertisement/filter', { 
        //     ...data, 
        //     searchType: searchType,
        //     optional: elemSelect.current.M_FormSelect.getSelectedValues() })
    }

    return (
        <div className="wrapper">
            <div className="search-wrapper">
                <div className="search-container" ref={searchContainer}>
                    <Form onSubmit={handleSubmit}>
                        <div className="basic-search-wrapper">

                            <div id="form-basic">
                                <Input
                                    inputsearch="search-input"
                                    type="text"
                                    name="filter"
                                    placeholder="Pesquise por marca, modelo ou preço"
                                />

                                <input
                                    onClick={() => setSearchType('basic')}
                                    className="btn btn-large"
                                    inputsearch="search-button"
                                    type="submit"
                                    value=""
                                />
                            </div>

                        </div>
                        <div className="advanced-button-wrapper">
                            <a className="btn-flat"
                                onClick={() => {
                                    setFilter(!changeText)
                                    return searchContainer.current.classList.toggle('drop_down')
                                }}
                            >
                                {changeText ? 'Filtro Básico' : 'Filtros Avançados'}

                                <i className="material-icons arrow_drop_down">arrow_drop_down</i>
                            </a>
                        </div>
                        <div className="advaced-search-wrapper">
                            <div id="form-complete">
                                <div id="advaced-search-g1">
                                    <Input
                                        inputsearch="search-input"
                                        type="text"
                                        name="brand"
                                        placeholder="Marca"
                                    />
                                    <Input
                                        inputsearch="search-input"
                                        type="text"
                                        name="model"
                                        placeholder="Modelo"
                                    />
                                    <Input
                                        inputsearch="search-input"
                                        type="text"
                                        name="potencia"
                                        placeholder="Potencia"
                                    />

                                </div>
                                <div id="advaced-search-g2">
                                    <div>
                                        <Input
                                            inputsearch="search-input"
                                            type="number"
                                            name="minYear"
                                            placeholder="Ano mínimo"
                                            min="1950"
                                            onChange={(e) => {
                                                const currentYear = new Date().getUTCFullYear()
                                                if (e.target.value.length > 3 && e.target.value < 1950)
                                                    return e.target.value = 1950
                                                else if (e.target.value > currentYear)
                                                    return e.target.value = currentYear
                                                else return e.target.value
                                            }}
                                        />
                                        <Input
                                            inputsearch="search-input"
                                            type="number"
                                            name="maxYear"
                                            placeholder="Ano máximo"
                                            max={new Date().getUTCFullYear()}
                                            onChange={(e) => {
                                                const currentYear = new Date().getUTCFullYear()
                                                if (e.target.value.length > 3 && e.target.value > currentYear)
                                                    return e.target.value = currentYear
                                                else return e.target.value
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            inputsearch="search-input"
                                            type="text"
                                            name="minPrice"
                                            placeholder="Preço mínimo"
                                            onChange={useMoneyFormat}
                                        />
                                        <Input
                                            inputsearch="search-input"
                                            type="text"
                                            name="maxPrice"
                                            placeholder="Preço máximo"
                                            onChange={useMoneyFormat}
                                        />
                                    </div>
                                </div>
                                <div id="advaced-search-g3">
                                    <div className="input-field col s12">
                                        <select multiple ref={elemSelect} defaultValue={[]}>
                                            {optional.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={() => setSearchType('complete')} type="submit" id="btn-advaced-search" className="btn btn-big">Pesquisar</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    )
}