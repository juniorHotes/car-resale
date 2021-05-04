import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import useMoneyFormat from '../../hooks/useMoneyFormat'

import imageNotFound from '../../assets/img/image_not_found.svg'

export default function Card({ className, id, title, price, year, km, image }) {
    const moneyFormat = useMoneyFormat

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
        <div className={`card-container ${className}`}>
            <Link to={`/details/${id}`} onClick={() => window.location.href = "#top"}>
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-image">
                                <img src={image ? `data:image/png;base64,${image}` : imageNotFound} />
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