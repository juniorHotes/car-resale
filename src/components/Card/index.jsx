import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import useMoneyFormat from '../../hooks/useMoneyFormat'
import useKmFormat from '../../hooks/useKmFormat'

import imageNotFound from '../../assets/img/image_not_found.svg'

export default function Card({ className, id, title, price, year, km, image }) {
    const moneyFormat = useMoneyFormat
    const kmFormat = useKmFormat

    const cardRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        cardRef.current.addEventListener('mouseenter', () => {
            imageRef.current.style.height = '110%'
        })
        cardRef.current.addEventListener('mouseleave', () => {
            imageRef.current.style.height = '100%'
        })
    }, [])


    return (
        <div className={`card-container ${className}`}>
            <Link to={`/details/${id}`} onClick={() => window.location.href = "#top"}>
                <div className="row">
                    <div className="col s12">
                        <div className="card" ref={cardRef}>
                            <div className="card-image">
                                <img ref={imageRef} src={image ? `data:image/png;base64,${image}` : imageNotFound} />
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
                                        <div className="card-km">{kmFormat(km)}Km</div>
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