import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Account from '../components/account/Account';
import Footer from '../components/main/Footer';
import Header from '../components/main/Header';
import Movies from '../components/movies/Movies';
import News from '../components/news/News';
import Theaters from '../components/theaters/Theaters';

import UserContextProvider from '../contexts/UserContext'
export default function AppRouter() {

    return (
        <BrowserRouter>
            <UserContextProvider>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/movies" />
                    </Route>
                    <Route path="/movies" component={Movies} />
                    <Route path="/account" component={Account} />
                    <Route path="/news" component={News} />
                    <Route path="/theaters" component={Theaters} />


                </Switch>
                <Footer />
            </UserContextProvider>
        </BrowserRouter >
    )
}
