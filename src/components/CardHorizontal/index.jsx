import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { ModalContext } from '../../App'

import './styles.css'
import useMoneyFormat from '../../hooks/useMoneyFormat'
import useDateFormat from '../../hooks/useDateFormat'

import imageNotFound from '../../assets/img/image_not_found.svg'

// Import Materialize
import M from "materialize-css";

export default function CardHorizontal({ id, image, title, brand, model, price, register, validThrue, reload, isActive, isPreload }) {
    const { openModal } = useContext(ModalContext)

    const FloatingActionButtonRef = useRef(null)

    const moneyFormat = useMoneyFormat
    const dateFormat = useDateFormat

    async function handleRenew() {
        isPreload(true)

        const auth = await Authorization()

        if (!auth) return

        await api.put(`/api/advertisement/${id}/renew`, { validThrue: '' }, auth)
            .then(() => {
                isPreload(false)
                openModal('Anúncio renovado com sucesso!', '', () => reload())
            }).catch(err => {
                openModal('Erro', 'Erro inesperado, tente de novo mais tarde')
                isPreload(false)
            })
    }

    async function handleActive() {
        isPreload(true)

        const auth = await Authorization()

        if (!auth) return

        await api.put(`/api/advertisement/${id}/active`, { active: true }, auth)
            .then(() => {
                isPreload(false)
                openModal('Anúncio ativado com sucesso!', '', () => reload())
            }).catch(err => {
                openModal('Erro', 'Erro inesperado, tente de novo mais tarde')
                isPreload(false)
            })
    }

    async function handleInactive() {
        isPreload(true)

        const auth = await Authorization()

        if (!auth) return

        await api.delete(`/api/advertisement/${id}`, auth)
            .then(() => {
                isPreload(false)
                openModal('Anúncio Inativado com sucesso!', '', () => reload())
            }).catch(err => {
                openModal('Erro', 'Erro inesperado, tente de novo mais tarde')
                isPreload(false)
            })
    }

    async function Authorization() {
        const token = sessionStorage.getItem('token')

        if (!token) {
            openModal('Acesso negado', 'Você não possue permissão de acesso, tente fazer login novamente')
            return false
        } else {
            const options = {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            };

            return options
        }
    }

    useEffect(() => {
        M.FloatingActionButton.init(FloatingActionButtonRef.current, {
            direction: 'left',
            hoverEnabled: false
        });

        if (window.innerWidth < 950) {

            if (!FloatingActionButtonRef.current) return

            FloatingActionButtonRef.current.classList.remove('direction-left')
            FloatingActionButtonRef.current.classList.add('direction-bottom')
        } else {

            if (!FloatingActionButtonRef.current) return

            FloatingActionButtonRef.current.classList.remove('direction-bottom')
            FloatingActionButtonRef.current.classList.add('direction-left')
        }

        window.addEventListener('resize', (e) => {
            if (window.innerWidth < 950) {

                if (!FloatingActionButtonRef.current) return

                FloatingActionButtonRef.current.classList.remove('direction-left')
                FloatingActionButtonRef.current.classList.add('direction-bottom')
            } else {

                if (!FloatingActionButtonRef.current) return

                FloatingActionButtonRef.current.classList.remove('direction-bottom')
                FloatingActionButtonRef.current.classList.add('direction-left')
            }
        })

    }, [])

    return (
        <div className="card horizontal">
            <div className="card-image">
                <img src={image ? `data:image/png;base64,${image}` : imageNotFound} alt="imagem do veículo" />
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

                <div className="fixed-action-btn" style={{ position: 'absolute' }} ref={FloatingActionButtonRef}>
                    <a className="btn btn-floating btn-large">
                        <i className="large material-icons">menu</i>
                    </a>
                    <ul>
                        <li>
                            <Link to={{
                                pathname: '/announce',
                                state: {
                                    edit: true,
                                    announceID: id
                                }
                            }}
                                className="btn-floating green"
                            >
                                <i className="material-icons left">edit</i>
                                Editar
                            </Link>
                        </li>

                        {isActive
                            ? (
                                <>
                                    <li>
                                        <a onClick={handleRenew}
                                            className="btn-floating blue"
                                        >
                                            <i className="material-icons left">event_available</i>
                                            Renovar
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={handleInactive}
                                            className="btn-floating red"
                                        >
                                            <i className="material-icons left">event_busy</i>
                                            Inativar
                                        </a>
                                    </li>
                                </>
                            )
                            : <li>
                                <a onClick={handleActive}
                                    className="btn-floating blue"
                                ><i className="material-icons left">beenhere</i>
                                    Ativar
                                </a>
                            </li>
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}