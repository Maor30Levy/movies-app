import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { getArticleByid } from '../../server/utils';

export default function Article({ id }) {
    const { contentData } = useContext(DataContext);

    const { name, subTitle, picture, article } = getArticleByid(id, contentData.newsData);
    return (
        <div className="article__main">
            <h2>{name}</h2>
            <h4>{subTitle}</h4>
            <img src={picture || './news-images/non-picture.jpg'} alt="article_picture" />
            <p>{article}</p>
        </div>
    )
}
