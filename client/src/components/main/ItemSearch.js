import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { goForwardAction } from '../../actions/ModalActions';
import { DataContext } from '../../contexts/DataContext';
import { ModalContext } from '../../contexts/ModalContext';
import { getMovieByID } from '../../server/utils';
import ItemQueryContainer from './ItemQueryContainer';

export default function ItemSearch({ itemInput, setOnInput, setIsQuery, }) {
    const history = useHistory();
    const { contentData } = useContext(DataContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const onClickMovie = (event) => {
        const target = event.target
        const element = target.children[0] ? target : target.parentElement;
        const { description, comments, id } = getMovieByID(element.id, contentData.moviesData)
        modalDataDispatch(goForwardAction({
            elementName: "Movie",
            props: { description, comments, id }
        }));
    };
    const onClickNews = (event) => {
        const target = event.target;
        const element = target.children[0] ? target : target.parentElement;
        setOnInput(false);
        setIsQuery(false);
        history.push(`/news/article/${element.id}`);
    };
    return (
        <div className="item-serach__container">
            <ItemQueryContainer
                itemType={"Movies"}
                items={contentData.moviesData}
                itemInput={itemInput}
                onClickFunc={onClickMovie}
            />

            <ItemQueryContainer
                itemType={"News"}
                items={contentData.newsData}
                itemInput={itemInput}
                onClickFunc={onClickNews}
            />
        </div>

    )
}
