import React from 'react';
import { nanoid } from 'nanoid';

const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday",];

export default function TimeSlot({ slot, onClickFunc }) {
    const day = (Object.keys(slot))[0];
    const onClickTime = (event) => {
        onClickFunc(event, slot);
    }



    return (
        <div className="time-slot">
            <div className="time-slot__day">{week[day - 1]}</div>
            <div className="time-slot__container">
                {slot[day].length > 0 && slot[day].map((show, i) => (
                    <div
                        className="time-slot__hour"
                        key={nanoid()}
                        id={i}
                        onClick={onClickTime}>{show.startTime}</div>
                ))}
            </div>
        </div>
    )
}
