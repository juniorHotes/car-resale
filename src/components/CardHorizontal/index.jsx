import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
import useMoneyFormat from '../../hooks/useMoneyFormat'
import useDateFormat from '../../hooks/useDateFormat'

import imageNotFound from '../../assets/img/image_not_found.svg'

export default function CardHorizontal({ id, image, title, brand, model, price, register, validThrue }) {
    const moneyFormat = useMoneyFormat
    const dateFormat = useDateFormat

    return (
        <div className="card horizontal">
            <div className="card-image">
                <img src={image ? `data:image/png;base64,${image}` : imageNotFound} />
            </div>
            <div className="card-stacked">
                <div className="card-content">

                    <div>
                        <h5>{title}</h5>
                        <h6>Marca: {brand}</h6>
                        <h6>Modelo: {model}</h6>
                        <h5>{moneyFormat(price)}</h5>
                    </div>

                    <div>
                        <h6>Cadastrado em {dateFormat(register)}</h6>
                        <h6>Válido até {dateFormat(validThrue)}</h6>
                    </div>

                </div>
                <div className="card-action" id="_card-action">
                    <Link to={{
                        pathname: '/announce',
                        state: {
                            edit: true,
                            announceID: id
                        }
                    }}
                        className="btn"
                    >Editart
                        <i className="material-icons left">edit</i>
                    </Link>
                    <Link to={id}
                        className="btn"
                    >Renovar
                        <i className="material-icons left">event_available</i>
                    </Link>
                    <Link to={id}
                        className="btn"
                    >Inativar
                        <i className="material-icons left">event_busy</i>
                    </Link>
                </div>
            </div>
        </div>
    )
}