import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import api from '../../services/api'
import useMoneyFormat from '../../hooks/useMoneyFormat'

import './styles.css'

import Input from '../Form/Input'

import M from "materialize-css";

export default function Search(props) {
    const history = useHistory()
    const { state } = props.parentProps.location
    const { searchQuery } = props

    const searchContainer = useRef(null)
    const elemSelect = useRef(null)

    const [changeText, setFilter] = useState(false)
    const [searchType, setSearchType] = useState('basic')

    const [optional, setOptional] = useState([])

    useEffect(async () => {

        const request = (await api('/api/optional')).data
        setOptional(request)

        const data = state ? state : { filter: "", searchType: "basic" }

        await api.post('/api/advertisement/filter', data)
            .then(req => {
                searchQuery(req.data)
            }).catch(err => err)

    }, [])

    useEffect(() => {
        M.FormSelect.init(elemSelect.current);
        elemSelect.current.M_FormSelect.input.placeholder = "Selecione um ou mais opcionais"
    }, [optional])

    async function handleSubmit(data) {

        const getDataForm = {
            ...data,
            searchType: searchType,
            minPrice: Number(data.minPrice.replace('R$', '').replace('.', '').replace(',', '')),
            maxPrice: Number(data.maxPrice.replace('R$', '').replace('.', '').replace(',', '')),
            minYear: Number(data.minYear),
            maxYear: Number(data.maxYear),
            maxKm: Number(data.maxKm),
            optional: elemSelect.current.M_FormSelect.getSelectedValues()
        }

        if (props.parentProps.location.pathname !== '/search_ad') {
            history.push('/search_ad', getDataForm)

            return
        }

        await api.post('/api/advertisement/filter', getDataForm)
            .then(req => {
                props.searchQuery(req.data)
            }).catch(err => err)
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
                                        type="number"
                                        name="maxKm"
                                        placeholder="Quilometragem"
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
                                            defaultValue="2000"
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
                                            defaultValue={new Date().getUTCFullYear()}
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
                                <button
                                    onClick={() => setSearchType('complete')}
                                    type="submit"
                                    id="btn-advaced-search"
                                    className="btn btn-big"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    )
}