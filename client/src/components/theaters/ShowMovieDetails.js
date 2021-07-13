import React, { useContext } from 'react';
import TimeSlot from './TimeSlot';
import { nanoid } from 'nanoid';
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';

export default function ShowMovieDetails({ name, slots, description }) {

    const { modalDataDispatch } = useContext(ModalContext);

    const onClickShowHours = (event, slot) => {
        const day = (Object.keys(slot))[0];
        const seats = slot[day][event.target.id].seats;
        modalDataDispatch(goForwardAction({ elementName: 'Seats', props: { seats } }));
    };
    return (
        <div>
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
