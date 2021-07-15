import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
export default function News() {

    const { contentData } = useContext(DataContext);
    const history = useHistory();
    const news = contentData.newsData;
    const onClickArticle = (event) => {
        const element = event.target.children[0] ?
            event.target :
            event.target.parentElement;
        const id = element.id;
        history.push(`/news/article/${id}`);
    }
    return (
        <div className="news__main">
            <div className="news__container">
                {news.map(({ name, picture, id }) => (
                    <div key={id} id={id} className="article" onClick={onClickArticle}>
                        <img src={picture || './news-images/non-picture.jpg'} alt="article_pitcure" />
                        <h1>{name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}
