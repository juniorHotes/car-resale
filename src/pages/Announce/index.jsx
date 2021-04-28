import React, { useRef, useState, useEffect } from 'react'
import './styles.css'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'
import SkyLight from 'react-skylight'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'

import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

export default function Announce() {
    const formRef = useRef(null);
    const skyLightRef = useRef(null);
    const textareaRef = useRef(null);

    const [preload, setPreload] = useState(false)
    const [dialogMsg, setDialogMsg] = useState(['', ''])

    const elemSelect = useRef(null)
    const [selectValues, setSelectValues] = useState([])
    const [optional, setOptional] = useState([])

    useEffect(async () => {
        const request = await api('/api/optional')
        setOptional(request.data)
    }, [])

    useEffect(() => {

        M.CharacterCounter.init(textareaRef.current)
        M.FormSelect.init(elemSelect.current);
        elemSelect.current.M_FormSelect.input.placeholder = "Selecione um ou mais opcionais"
        setSelectValues(elemSelect.current)

    }, [optional])

    async function handleSubmit(data, { reset }) {
        console.log(data)
        // formRef.current.setErrors({})
        // try {
        //     const schema = Yup.object().shape({
        //         email: Yup.string()
        //             .email("Digite um e-mail válido")
        //             .required("O e-mail é obrigatório"),

        //         password: Yup.string().required("Forneça sua senha por favor")
        //     })

        //     await schema.validate(data, {
        //         abortEarly: false
        //     })

        //     setPreload(true)

        //     await api.post('/api/authorize', data)
        //         .then((promise) => {
        //             reset()
        //             setPreload(false)
        //             setDialogMsg(['Você está logado', ''])
        //             skyLightRef.current.show()


        //             const { token } = promise.data
        //             if (token) {
        //                 sessionStorage.setItem('token', token)
        //             }

        //         }).catch(err => {
        //             setPreload(false)
        //             setDialogMsg(['Erro ao fazer login', 'Erro ao entrar em contato com o servidor'])
        //             skyLightRef.current.show()
        //         })

        // } catch (err) {
        //     const validationErrors = {};
        //     if (err instanceof Yup.ValidationError) {
        //         err.inner.forEach(error => {
        //             validationErrors[error.path] = error.message;
        //         });
        //         formRef.current.setErrors(validationErrors);
        //     }
        // }
    }

    return (
        <>
            <NavBar />
            <div className='container'>
                <div className="announce-container">
                    <div>
                        <h2>Crie um Anúncio</h2>
                        <span>Todos os campos são obrigatórios</span>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit} ref={formRef}>
                            <div>
                                <Input
                                    label="Título"
                                    type="text"
                                    name="Title"
                                    placeholder="Ex: Jetta Impecável"
                                />

                                <div class="row">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea ref={textareaRef}
                                        placeholder="Adicione uma breve descrição"
                                        name="Description"
                                        id="description"
                                        className="materialize-textarea"
                                        rows="3"
                                        data-length="520">
                                    </textarea>
                                </div>

                                <Input
                                    label="Marca"
                                    type="text"
                                    name="Brand"
                                    placeholder="Ex: VW"
                                />

                                <Input
                                    label="Modelo"
                                    type="text"
                                    name="Model"
                                    placeholder="Ex: Jetta"
                                />

                                <Input
                                    label="Km"
                                    type="text"
                                    name="Km"
                                    placeholder="Ex: 123456"
                                />

                                <Input
                                    label="Potência"
                                    type="text"
                                    name="Potence"
                                    placeholder="Ex: 2.0"
                                />

                                <Input
                                    label="Ano"
                                    type="text"
                                    name="Year"
                                    placeholder="Ex: 2021"
                                />

                                <Input
                                    label="Preço"
                                    type="text"
                                    name="Price"
                                    placeholder=""
                                />

                                <div className="input-field col s12">
                                    <select multiple ref={elemSelect} defaultValue={[]}>
                                        {optional.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Adicionar Imagens</span>
                                        <input type="file" name="file-image" className="file" multiple />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input name="image" className="file-path validate" type="text" placeholder="Selecione as imagens para upload" />
                                    </div>
                                </div>

                                <div className="preload">
                                    {preload &&
                                        <div className="progress">
                                            <div className="indeterminate"></div>
                                        </div>
                                    }
                                    <button disabled={preload}
                                        className="btn btn-large btn-100"
                                        type="submit"
                                    >
                                        Anunciar
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}