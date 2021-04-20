import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import api from '../../services/api'

import './styles.css'

import Input from '../Form/Input'

export default function HomeSearch(props) {

    return (
        <div className="wrapper">
            <div className="search-wrapper">
                <div className="search-container">
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
                            name="preço"
                            placeholder="Preço"
                        />

                        <input
                            className="btn btn-large"
                            inputSearch="search-button"
                            type="submit"
                            value=""
                        />
                    </Form>
                </div>
            </div>

        </div>
    )
}