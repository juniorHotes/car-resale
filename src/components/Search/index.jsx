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
    const moneyFormat = useMoneyFormat
    const { state } = props.parentProps.location
    const { searchQuery, searchQueryError, isPreload } = props

    const searchContainer = useRef(null)
    const elemSelect = useRef(null)

    const [changeText, setChangeText] = useState(false)
    const [searchType, setSearchType] = useState('basic')

    const [optional, setOptional] = useState([])

    const [filter, setFilter] = useState('')
    const [brand, setbrand] = useState('')
    const [model, setModel] = useState('')
    const [maxKm, setMaxKm] = useState('')
    const [minYear, setMinYear] = useState(state && state.minYear)
    const [maxYear, setMaxYear] = useState(state && state.maxYear)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = (await api('/api/optional')).data
            setOptional(request)

            // Está chamada funciona apenas da página de resultados
            if (state) {

                const data = state ? state : { filter: "", searchType: "basic" }

                if (data.searchType === 'complete') {
                    setbrand(data.brand)
                    setModel(data.model)
                    setMaxKm(data.maxKm)
                    setMinYear(data.minYear)
                    setMaxYear(data.maxYear)
                    setMinPrice(moneyFormat(data.minPrice))
                    setMaxPrice(moneyFormat(data.maxPrice))
                } else {
                    setFilter(data.filter)
                }
                await apiRequest(data)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        M.FormSelect.init(elemSelect.current);
        elemSelect.current.M_FormSelect.input.placeholder = "Selecione um ou mais opcionais"
    }, [optional])

    async function handleSubmit(data) {

        if (state) {
            isPreload(true)
            searchQueryError(false)
        }

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

        await apiRequest(getDataForm)
    }

    async function apiRequest(data) {
        await api.post('/api/advertisement/filter', data)
            .then(req => {
                searchQuery(req.data)
            }).catch(err => {
                searchQueryError(true)
            })
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
                                    defaultValue={filter}
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
                            <a href="#" className="btn-flat"
                                onClick={() => {
                                    setChangeText(!changeText)
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
                                        defaultValue={brand}
                                    />
                                    <Input
                                        inputsearch="search-input"
                                        type="text"
                                        name="model"
                                        placeholder="Modelo"
                                        defaultValue={model}
                                    />
                                    <Input
                                        inputsearch="search-input"
                                        type="number"
                                        name="maxKm"
                                        placeholder="Quilometragem"
                                        defaultValue={maxKm === 0 ? '' : maxKm}
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
                                            defaultValue={minYear || '2000'}
                                            onBlur={(e) => {
                                                if (e.target.value < 1950)
                                                    return e.target.value = 1950
                                            }}
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
                                            defaultValue={maxYear || new Date().getUTCFullYear()}
                                            onBlur={(e) => {
                                                const currentYear = new Date().getUTCFullYear()
                                                if (e.target.value.length < 4 && e.target.value < currentYear)
                                                    return e.target.value = currentYear
                                            }}
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
                                            defaultValue={minPrice === '' ? '' : minPrice}
                                        />
                                        <Input
                                            inputsearch="search-input"
                                            type="text"
                                            name="maxPrice"
                                            placeholder="Preço máximo"
                                            onChange={useMoneyFormat}
                                            defaultValue={maxPrice === '' ? '' : maxPrice}
                                        />
                                    </div>
                                </div>
                                <div id="advaced-search-g3">
                                    <div className="input-field col s12">
                                        <select multiple ref={elemSelect} defaultValue={['selected', '']}>
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