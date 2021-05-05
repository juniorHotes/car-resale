import React, { useRef, useState, useEffect } from 'react'
import './styles.css'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'
import SkyLight from 'react-skylight'
import useMoneyFormat from '../../hooks/useMoneyFormat'

import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Input from '../../components/Form/Input'
import InputTextarea from '../../components/Form/InputTextarea'

import M from "materialize-css";

export default function Announce() {
    const formRef = useRef(null);
    const skyLightRef = useRef(null);

    const [preload, setPreload] = useState(false)
    const [dialogMsg, setDialogMsg] = useState(['', ''])

    const elemSelect = useRef(null)
    const [optional, setOptional] = useState([])

    const [selectedFile, setSelectedFile] = useState([]);

    const changeHandler = (event) => {
        if (event.target.files.length > 10) {
            event.target.value = ""

            setDialogMsg(['Limite de imagens excedido!', 'Você pode enviar até 10 imagens'])
            skyLightRef.current.show()

            return
        } else {
            setSelectedFile(event.target.files);
        }
    };

    useEffect(async () => {
        const request = await api('/api/optional')
        setOptional(request.data)
    }, [])

    useEffect(() => {

        M.CharacterCounter.init(formRef.current.getFieldRef('Title'))
        M.CharacterCounter.init(formRef.current.getFieldRef('Description'))
        M.FormSelect.init(elemSelect.current);
        elemSelect.current.M_FormSelect.input.placeholder = "Selecione um ou mais opcionais"

    }, [optional])

    async function handleSubmit(data, { reset }) {

        const getDataForm = {
            ...data,
            Price: Number(data.Price.replace('R$', '').replace('.', '').replace(',', '')),
            Km: Number(data.Km),
            Year: Number(data.Year),
            CityIbge: Number(data.CityIbge),
            Optionals: elemSelect.current.M_FormSelect.getSelectedValues()
        }

        if (selectedFile.length == 0) {
            setDialogMsg(['Selecione pelo menos uma imagem!', 'Você pode enviar até 10 imagens'])
            skyLightRef.current.show()

            return
        }

        console.log(getDataForm)
        formRef.current.setErrors({})

        try {

            const schema = Yup.object().shape({
                Title: Yup.string().required("Campo obrigatório").max(150, "Limite de caracteres excedido"),
                Description: Yup.string().required("Campo obrigatório").max(520, "Limite de caracteres excedido"),
                Brand: Yup.string().required("Campo obrigatório"),
                Model: Yup.string().required("Campo obrigatório"),
                Km: Yup.string().required("Campo obrigatório"),
                Potence: Yup.string().required("Campo obrigatório"),
                Price: Yup.string().required("Campo obrigatório"),
                Year: Yup.string().required("Campo obrigatório"),
                CityName: Yup.string().required("Campo obrigatório"),
                CityIbge: Yup.string().required("Campo obrigatório"),
            })

            await schema.validate(getDataForm, {
                abortEarly: false
            })

            setPreload(true)

            const formData = new FormData();


            formData.append("json", JSON.stringify(getDataForm));

            for (let i = 0; i < selectedFile.length; i++) {
                formData.append("image", selectedFile[i]);
            }

            const token = sessionStorage.getItem('token')

            if(!token) {
                setPreload(false)
                setDialogMsg(['Acesso negado', 'Você não possue permissão de acesso, tente fazer login novamente'])
                skyLightRef.current.show()

                return
            }

            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                    Authorization: 'Bearer ' + token
                },
            };

            await api.post('/api/advertisement', formData, options)
                .then(() => {
                    reset()
                    setPreload(false)
                    setDialogMsg(['Cadastro realizado com sucesso', ''])
                    skyLightRef.current.show()
                }).catch(err => {
                    setPreload(false)
                    setDialogMsg(['Erro inesperado', 'Erro ao entrar em contato com o servidor'])
                    skyLightRef.current.show()
                })

        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }

    return (
        <>
            <SkyLight ref={skyLightRef}
                title={dialogMsg[0]} >
                {dialogMsg[1]}
            </SkyLight>

            <NavBar />
            <div className='container'>
                <div className="announce-container form-content">
                    <div className="form-title">
                        <h3>Crie um Anúncio</h3>
                        <span>Todos os campos com * são obrigatórios</span>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit} ref={formRef}>
                            <div>

                                <div className="row">
                                    <Input
                                        label="Título*"
                                        type="text"
                                        name="Title"
                                        placeholder="Ex: Jetta Impecável"
                                        disabled={preload}
                                        data-length="50"
                                    />
                                </div>

                                <div className="row">
                                    <InputTextarea
                                        label="Descrição*"
                                        name="Description"
                                        id="description"
                                        className="materialize-textarea"
                                        placeholder="Adicione uma breve descrição"
                                        disabled={preload}
                                        data-length="520">
                                    </InputTextarea>
                                </div>

                                <Input
                                    label="Marca*"
                                    type="text"
                                    name="Brand"
                                    placeholder="Ex: VW"
                                    disabled={preload}
                                />

                                <Input
                                    label="Modelo*"
                                    type="text"
                                    name="Model"
                                    placeholder="Ex: Jetta"
                                    disabled={preload}
                                />

                                <Input
                                    label="Km*"
                                    type="number"
                                    name="Km"
                                    placeholder="Ex: 123456"
                                    disabled={preload}
                                />

                                <Input
                                    label="Potência*"
                                    type="text"
                                    name="Potence"
                                    placeholder="Ex: 2.0"
                                    disabled={preload}
                                />

                                <Input
                                    label="Ano*"
                                    type="number"
                                    name="Year"
                                    placeholder="Ex: 2021"
                                    disabled={preload}
                                />

                                <Input
                                    label="Preço*"
                                    type="text"
                                    name="Price"
                                    placeholder=""
                                    onChange={useMoneyFormat}
                                    disabled={preload}
                                />

                                <Input
                                    label="Cidade*"
                                    type="text"
                                    name="CityName"
                                    placeholder=""
                                    disabled={preload}
                                />

                                <Input
                                    label="Número do IBGE*"
                                    type="number"
                                    name="CityIbge"
                                    placeholder=""
                                    disabled={preload}
                                />

                                <div className="input-field col s12">
                                    <select disabled={preload} multiple ref={elemSelect} defaultValue={[]}>
                                        {optional.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                    </select>
                                    <label style={{ left: "unset", top: "-37px" }} >Opcionais</label>
                                </div>
                            </div>

                            <div>
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Adicionar Imagens</span>
                                        <input disabled={preload} onChange={changeHandler} accept="image/*" type="file" name="file-image" className="file" multiple />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input disabled={preload} onChange={changeHandler} name="imageName" className="file-path validate" type="text" placeholder="Selecione no máximo 10 imagens" />
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