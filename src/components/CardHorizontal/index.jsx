import React, { useEffect } from 'react'

import './styles.css'
import useMoneyFormat from '../../hooks/useMoneyFormat'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

import imageNotFound from '../../assets/img/image_not_found.svg'

// Import Materialize
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function CardHorizontal({ image, title, brand, model, price }) {
    const moneyFormat = useMoneyFormat

    useEffect(() => {
        const tooltips = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltips);
    }, [])

    return (
        <div class="card horizontal">
            <div class="card-image">
                <img src={image ? image : imageNotFound} />
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <h5>Título: {title}</h5>
                    <h6>Marca: {brand}</h6>
                    <h6>Modelo: {model}</h6>
                    <h6>Preço: {moneyFormat(price)}</h6>
                </div>
                <div class="card-action" id="_card-action">
                    <a href="#"
                        className="tooltipped"
                        data-position="left"
                        data-tooltip="Editar"
                    >
                        <i class="small material-icons">edit</i>
                    </a>
                    <a href="#"
                        className="tooltipped"
                        data-position="left"
                        data-tooltip="Inativar"
                    >
                        <i class="small material-icons">pause_circle_outline</i>
                    </a>
                    <a href="#"
                        className="tooltipped"
                        data-position="left"
                        data-tooltip="Deletar"
                    >
                        <i class="small material-icons">delete_forever</i>
                    </a>
                </div>
            </div>
        </div>
    )
}