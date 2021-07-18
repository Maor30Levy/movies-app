import React, { useContext } from 'react';
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import Ratings from './Ratings';



export default function MovieItem({ id, description, name, ratings, comments, picture, trailer }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickMovie = () => {
        modalDataDispatch(goForwardAction({
            elementName: "Movie",
            props: { description, comments, id, trailer }
        }));
    };
    return (
        <div className="item">
            <div className="poster__container" onClick={onClickMovie}>
                <img className="poster" src={picture || "./movies-images/movies-icon.png"} alt="movie-poster" />
            </div>
            <Ratings
                criticsRatings={ratings.critics}
                audienceRatings={ratings.audience}
                id={id}
            />
            <div className="movie-name" onClick={onClickMovie}>{name}</div>
        </div>
    )
}
