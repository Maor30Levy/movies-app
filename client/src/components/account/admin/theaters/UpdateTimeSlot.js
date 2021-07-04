import React from 'react'
import { getMovieByID } from '../../../../server/utils'
import { nanoid } from 'nanoid';
import TimeSlot from '../../../theaters/TimeSlot';
export default function UpdateTimeSlot({ movieTimeSlots }) {
    const { name } = getMovieByID(movieTimeSlots.movieID);
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",];
    const days = [];
    const slots = [movieTimeSlots.slots.slots];
    console.log(slots[0]);
    if (slots[0].length > 0) for (let slot of slots[0]) {
        days.push(Object.keys(slot)[0])
    }
    return (
        <div>
            <h3>{name}</h3>
            {
                slots.length > 0 && slots[0].map((slot) => {

                    return (
                        <TimeSlot key={nanoid()} slot={slot} />
                    )
                })
            }
            <div>Add Day</div>
        </div>
    )
}
