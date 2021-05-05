import React, { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import 'materialize-css/dist/css/materialize.min.css';
import './assets/styles/global.css'

const ModalContext = createContext({
    title: '',
    mensage: '',
    showModal: () => { }
})


const App = () =>
    <BrowserRouter>
        <ModalContext.Provider>
            <Routes />
        </ModalContext.Provider>
    </BrowserRouter>

export default App;
