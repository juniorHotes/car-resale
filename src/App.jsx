import React, { useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import 'normalize.css'
import 'materialize-css/dist/css/materialize.min.css';
import './assets/styles/global.css'
import SkyLight from 'react-skylight'
import ModalContext from './hooks/context'


const App = () => {
    const skyLightRef = useRef(null);

    const [dialogMsg, setDialogMsg] = useState(['', ''])
    // const [onClose, setOnClose] = useState()

    function openModal(title, mensage) {
        setDialogMsg([title, mensage])
        skyLightRef.current.show()
    }

    function onCloseModal(func) {
        
    }

    return (
        <BrowserRouter>
            <ModalContext.Provider value={{ openModal, onCloseModal }}>
                <ModalContext.Consumer>
                    {() => {
                        console.log(dialogMsg)
                        return (
                            <>
                                <Routes />
                                <SkyLight 
                                    ref={skyLightRef}
                                    afterClose={() => onCloseModal()}
                                    title={dialogMsg[0]} >
                                    {dialogMsg[1]}
                                </SkyLight>
                            </>
                        )
                    }}
                </ModalContext.Consumer>
            </ModalContext.Provider>
        </BrowserRouter>
    )
}
export default App;
