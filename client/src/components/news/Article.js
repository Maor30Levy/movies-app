import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { getArticleByid } from '../../server/utils';
import { ModalContext } from '../../contexts/ModalContext';
import Modal from '../main/Modal';


export default function Article({ id }) {
    const { contentData } = useContext(DataContext);
    const { modalData } = useContext(ModalContext);

    const { name, subTitle, picture, article } = getArticleByid(id, contentData.newsData);
    return (
        <div className="article__main">
            <h2>{name}</h2>
            <h4>{subTitle}</h4>
            <img src={picture || './news-images/non-picture.jpg'} alt="article_picture" />
            <p>{article}</p>
            {modalData.isModal && <Modal />}
        </div>
    )
}
