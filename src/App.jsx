import React, { useRef, useState, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import 'normalize.css'
import 'materialize-css/dist/css/materialize.min.css';
import './assets/styles/global.css'
import SkyLight from 'react-skylight'

export const ModalContext = createContext()

const App = () => {
    const skyLightRef = useRef(null);
    const [skyLightActions, setSkyLightActions] = useState({ title: "", children: null, afterClose: () => { } })

    function openModal(title, children, afterClose) {
        setSkyLightActions({ title, children, afterClose })
        skyLightRef.current.show()
    }

    return (
        <BrowserRouter>
            <ModalContext.Provider value={{ openModal }}>
                <ModalContext.Consumer>
                    {() => {
                        return (
                            <>
                                <Routes />
                                <SkyLight
                                    ref={skyLightRef}
                                    afterClose={skyLightActions.afterClose}
                                    title={skyLightActions.title}
                                >
                                    {skyLightActions.children}
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
