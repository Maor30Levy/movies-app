import React from 'react';
import TimeSlot from './TimeSlot';
import { nanoid } from 'nanoid';

export default function ShowMovieDetails({ name, slots }) {
    console.log(slots)
    return (
        <div>
            <div className="description__container">
                Description
            </div>
            <div>
                {slots.length > 0 ?
                    slots[0].map((slot, i) => (<TimeSlot key={nanoid()} slot={slot} />))
                    : "No Available Time Slots."}
            </div>
        </div>
    )
}
