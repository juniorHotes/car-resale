import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import exemple from '../../assets/img/1-335x186.jpg'

export default function Card(props) {
    const { title, price, yar, info } = props
    return (
        <Link to="details" className={props.className}>
            <div className="card-container">
                <header className="card-header">
                    <div>
                        <img src={exemple} alt="" />
                    </div>
                </header>
                <div className="card-wrapper">
                    <section className="card-section">

                        {title &&
                            <div>
                                <h4>{title}</h4>
                            </div>
                        }
                        <span className="car-price">{price}</span>
                    </section>
                    <div className="card-footer">
                        {yar &&
                            <span className="card-car-yar">{yar}</span>
                        }

                        {info &&
                            <div className="card-info">{info}</div>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}