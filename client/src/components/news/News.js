import React from 'react'
import { useHistory } from 'react-router-dom';
import { getNews } from '../../server/utils';
export default function News() {
    const history = useHistory();
    const news = getNews();
    const onClickArticle = (event) => {
        const element = event.target.children[0] ?
            event.target :
            event.target.parentElement;
        const id = element.id;
        history.push(`/news/article/${id}`);
    }
    return (
        <div className="news__main">
            {news.map(({ name, picture, id }) => (
                <div key={id} id={id} className="article" onClick={onClickArticle}>
                    <img src={`data:image/png;base64, ${picture}`} alt="article_pitcure" />
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    )
}
