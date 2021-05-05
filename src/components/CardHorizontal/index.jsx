import React, { useEffect } from 'react'

import './styles.css'
import useMoneyFormat from '../../hooks/useMoneyFormat'

import imageNotFound from '../../assets/img/image_not_found.svg'

export default function CardHorizontal({ id, image, title, brand, model, price }) {
    const moneyFormat = useMoneyFormat

    return (
        <div className="card horizontal">
            <div className="card-image">
                <img src={imageNotFound} />
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <h5>Título: {title}</h5>
                    <h6>Marca: {brand}</h6>
                    <h6>Modelo: {model}</h6>
                    <h6>Preço: {moneyFormat(price)}</h6>
                </div>
                <div className="card-action" id="_card-action">
                    <a href={id}
                        className="btn"
                    >Editart
                        <i className="material-icons left">edit</i>
                    </a>
                    <a href={id}
                        className="btn"
                    >Renovar
                        <i className="material-icons left">event_available</i>
                    </a>
                    <a href={id}
                        className="btn"
                    >Inativar
                        <i className="material-icons left">event_busy</i>
                    </a>
                </div>
            </div>
        </div>
    )
}