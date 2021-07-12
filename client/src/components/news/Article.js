import React from 'react';
import { getArticleByid } from '../../server/utils';

export default function Article({ id }) {
    const { name, subTitle, picture, article } = getArticleByid(id);
    return (
        <div className="article__main">
            <h2>{name}</h2>
            <h4>{subTitle}</h4>
            <img src={`data:image/png;base64, ${picture}`} alt="article_picture" />
            <p>{article}</p>
        </div>
    )
}