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
                            type="text"
                            name="marca"
                            placeholder="Marca"
                        />
                        <Input
                            type="text"
                            name="modelo"
                            placeholder="Modelo"
                        />
                        <Input
                            type="text"
                            name="preço"
                            placeholder="Preço"
                        />

                        <input
                            className="btn btn-large"
                            inputSearch="search"
                            type="submit"
                            value=""
                        />
                    </Form>
                </div>
            </div>

        </div>
    )
}