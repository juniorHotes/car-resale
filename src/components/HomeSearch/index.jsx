import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import Input from '../Form/Input'

export default function HomeSearch(props) {

    return (
        <div className="wrapper">
            <div className="search-container">
                <form action="">
                    <Input
                        inputType="text"
                        name="marca"
                        placeholder="Marca"
                    />
                    <Input
                        inputType="text"
                        name="modelo"
                        placeholder="Modelo"
                    />
                    <Input
                        inputType="text"
                        name="preço"
                        placeholder="Preço"
                    />

                    <Input
                        size="200px"
                        inputType="submit"
                        bgColor="secundary"
                        value=""
                        inputSearch="search"
                    />
                </form>
            </div>

        </div>
    )
}