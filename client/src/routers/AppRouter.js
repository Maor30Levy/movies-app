import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Account from '../components/account/Account';
import Footer from '../components/main/Footer';
import Header from '../components/main/Header';
import Movies from '../components/movies/Movies';
import News from '../components/news/News';
import Theaters from '../components/theaters/Theaters';
import ModalContextProvider from '../contexts/ModalContext';
import UserContextProvider from '../contexts/UserContext';
import DataContextProvider from '../contexts/DataContext';
import Article from '../components/news/Article';
import ArticleRoute from './ArticleRoute';
import Home from '../components/main/Home';
export default function AppRouter() {
    return (
        <BrowserRouter>
            <ModalContextProvider>
                <UserContextProvider>
                    <DataContextProvider>
                        <Header />
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to="/movies" />
                            </Route>
                            {/* <Route path="/home" component={Home} /> */}
                            <Route path="/movies" component={Movies} />
                            <Route path="/account" component={Account} />
                            <ArticleRoute path="/news/article" component={Article} />
                            <Route path="/news" component={News} />
                            <Route path="/theaters" component={Theaters} />
                            <Route path="*" component={Movies} />
                        </Switch>
                        <Footer />
                    </DataContextProvider>
                </UserContextProvider>
            </ModalContextProvider>
        </BrowserRouter >
    )
}
