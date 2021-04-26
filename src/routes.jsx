import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';
import NewUser from './pages/NewUser';
import Login from './pages/Login';
import Announce from './pages/Announce';
import Results from './pages/Results';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/details" component={Details} />
            <Route path="/newuser" component={NewUser} />
            <Route path="/login" component={Login} />
            <Route path="/announce" component={Announce} />
            <Route path="/api/advertisement/filter" component={Results} />
        </BrowserRouter>
    );
}