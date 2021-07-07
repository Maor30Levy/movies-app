import React from 'react';
import { Redirect, Route } from 'react-router';
import { getArticleByid } from '../server/utils';

const ArticleRoute = ({ component: Component, ...rest }) => {
    const id = document.location.pathname.replace('/news/article/', "");
    const article = getArticleByid(id);
    return (
        <Route
            {...rest}
            component={(props) => (
                !!article ?
                    <Component {...props} id={id} /> :
                    <Redirect to={{ pathname: "/news" }} />

            )}
        />);
};

export default ArticleRoute;
