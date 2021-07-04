import React, { useContext } from 'react'
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import { getMovieAvailabilityAll } from '../../server/utils';
import ShowComments from './ShowComments';
import { nanoid } from 'nanoid';

export default function Movie({ description, comments, id }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const allSlots = getMovieAvailabilityAll(id);

    const onClickTheater = (event) => {
        const { name, slots } = allSlots[event.target.id];
        modalDataDispatch(goForwardAction({
            elementName: "ShowMovieDetails",
            props: { name, slots }
        }));
    }
    return (
        <div className="movie__container">
            <div className="description__container">
                {description}
            </div>
            <div className="theater-options">
                {allSlots.map(({ theater, location }, i) => (
                    <div key={nanoid()}>
                        <div className="modal__option" onClick={onClickTheater} id={i}>
                            {`${theater}, ${location}`}
                        </div>
                    </div>
                ))}
            </div>
            <div><ShowComments comments={comments} /></div>
        </div>
    )
}
