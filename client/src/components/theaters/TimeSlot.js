import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import { goForwardAction } from '../../actions/ModalActions';
import Seats from './Seats';
const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday",];

export default function TimeSlot({ slot }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const day = (Object.keys(slot))[0];
    const onClickShowHours = (event) => {
        const seats = slot[day][event.target.id].seats;
        modalDataDispatch(goForwardAction(<Seats seats={seats} />));
    };


    return (
        <div className="time-slot">
            <div className="time-slot__day">{week[day - 1]}</div>
            <div className="time-slot__container">
                {slot[day].length > 0 && slot[day].map((show, i) => (
                    <div
                        className="time-slot__hour"
                        key={i}
                        id={i}
                        onClick={onClickShowHours}>{show.startTime}</div>
                ))}
            </div>
        </div>
    )
}
