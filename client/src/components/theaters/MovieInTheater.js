import React, { useContext } from 'react';
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';


export default function MovieInTheater({ name, slots, id, picture, trailer, description, movieID }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickMovie = () => {
        const children = {
            elementName: 'ShowMovieDetails',
            props: {
                name,
                slots,
                description,
                movieID,
                trailer,
                theaterID: id
            }
        }
        modalDataDispatch(goForwardAction(children));
    }
    return (
        <div className="theater__movie" onClick={onClickMovie}>
            <h4>{name}</h4>
            <div className="poster__container">
                <img className="poster" src={picture || "./movies-images/movies-icon.png"} alt="movie-poster" />
            </div>
            {/* {slots.length > 0 &&
                <div className="time-slot">
                    {getSlots(slots)}
                </div>
            } */}

        </div>
    )
}
