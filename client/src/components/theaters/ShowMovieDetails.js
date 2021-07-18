import React, { useContext } from 'react';
import TimeSlot from './TimeSlot';
import { nanoid } from 'nanoid';
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import Trailer from '../movies/Trailer';
export default function ShowMovieDetails({ name, slots, description, movieID, theaterID, trailer }) {

    const { modalDataDispatch } = useContext(ModalContext);
    const onClickShowHours = (event, slot) => {
        const day = (Object.keys(slot))[0];
        const seats = slot[day][event.target.id].seats;
        modalDataDispatch(goForwardAction({ elementName: 'Seats', props: { seats, slotIndex: event.target.id, day, movieID, theaterID } }));
    };
    return (
        <div>
            {trailer && <Trailer trailer={trailer} />}
            <div className="description__container">
                {description}
            </div>
            <div>
                {slots.length > 0 ?
                    slots[0].map((slot, i) => (<TimeSlot key={nanoid()} slot={slot} onClickFunc={onClickShowHours} />))
                    : "No Available Time Slots."}
            </div>
        </div>
    )
}
