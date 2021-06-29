import React, { useContext } from 'react';
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';


export default function MovieInTheater({ name, slots, id, setModal }) {
    const { modalDataDispatch } = useContext(ModalContext);


    const getSlots = (slots) => {
        let result = 'Days: ';
        for (let slot of slots[0]) {
            const key = Object.keys(slot);
            result += `${key[0]}, `;
        }
        result.substring(0, result.length - 2)
        return result.substring(0, result.length - 2);
    };

    const onClickMovie = () => {
        const children = {
            elementName: 'ShowMovieDetails',
            props: {
                name,
                slots
            }
        }
        modalDataDispatch(goForwardAction(children));
    }
    return (
        <div className="theater__movie" onClick={onClickMovie}>
            <h4>{name}</h4>
            <div className="poster__container">
                <img className="poster" src="./temp/peter-rabbit-2.jpg" alt="movie-poster" />
            </div>
            {slots.length > 0 &&
                <div className="time-slot">
                    {getSlots(slots)}
                </div>
            }

        </div>
    )
}
