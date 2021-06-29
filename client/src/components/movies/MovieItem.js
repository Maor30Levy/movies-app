import React, { useContext } from 'react';
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import Ratings from './Ratings';



export default function MovieItem({ id, description, name, ratings, comments }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickMovie = () => {
        modalDataDispatch(goForwardAction({
            elementName: "Movie",
            props: { description, comments, id }
        }));
    };
    return (
        <div className="item">
            <div className="poster__container" onClick={onClickMovie}>
                <img className="poster" src="./temp/peter-rabbit-2.jpg" alt="movie-poster" />
            </div>
            <Ratings
                criticsRatings={ratings.critics}
                audienceRatings={ratings.audience}
            />
            <div className="movie-name" onClick={onClickMovie}>{name}</div>
        </div>
    )
}
