import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import exemple from '../../assets/img/1-335x186.jpg'

export default function Card(props) {
    const { id, title, price, year, km, image } = props

    function moneyFormat(event) {
        const onlyDigits = String(event)
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        return event = maskCurrency(digitsFloat)
    }
    
    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    function kmFormat(event) {
        const onlyDigits = String(event)
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -3) + "." + onlyDigits.slice(-3)
        return event = digitsFloat
    }

    return (
        <div className={`card-container ${props.className}`}>
            <Link to={`/details?id=${id}`} onClick={() => window.location.href = "#top"}>
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-image">
                                <img src={image ? "data:image/png;base64," + image : exemple} />
                            </div>
                            <div className="card-content">
                                {title &&
                                    <span className="card-title">{title}</span>
                                }
                                <div className="card-footer">
                                    <span className="car-price" >{moneyFormat(price)}</span>
                                    {year &&
                                        <span className="card-car-yar">{year}</span>
                                    }
                                    {km &&
                                        <div className="card-km">{kmFormat(km)} Km</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}