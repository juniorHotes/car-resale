import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import Input from '../Form/Input'

export default function HomeSearch(props) {

    return (
        <div className="wrapper">
            <div className="search-container">
                <form action="">
                    <Input inputType="text" name="marca" validate="" placeholder="Marca" />
                    <Input inputType="text" name="modelo" validate="" placeholder="Modelo"/>
                    <Input inputType="text" name="preço" validate="" placeholder="Preço"/>
                    <Input inputType="submit"/>
                </form>
            </div>

        </div>
    )
}