import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { DataContext } from '../contexts/DataContext';
import { getArticleByid } from '../server/utils';

const ArticleRoute = ({ component: Component, ...rest }) => {
    const { contentData } = useContext(DataContext);

    const id = document.location.pathname.replace('/news/article/', "");
    const article = getArticleByid(id, contentData.newsData);
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
