import React from 'react'
import { Switch } from 'react-router-dom';
import RouteAuth from './RouteAuth'

import Home from './pages/Home';
import Details from './pages/Details';
import NewUser from './pages/NewUser';
import Login from './pages/Login';
import Announce from './pages/Announce';
import Results from './pages/Results';
import MyAds from './pages/MyAds';

export default function Routes() {
    return (
        <Switch>
            <RouteAuth path="/" exact component={Home} />
            <RouteAuth path="/details" component={Details} />
            <RouteAuth path="/new_user" component={NewUser} />
            <RouteAuth path="/login" component={Login} />
            <RouteAuth path="/announce" component={Announce} isPrivate />
            <RouteAuth path="/my_ads" component={MyAds} isPrivate />
            <RouteAuth path="/api/advertisement/filter" component={Results} />
        </Switch>
    );
}