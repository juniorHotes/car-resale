import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import './assets/styles/global.css'
import 'materialize-css/dist/css/materialize.min.css';

const App = () =>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>

export default App;
