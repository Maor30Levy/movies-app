import React from 'react';
import TimeSlot from './TimeSlot';

export default function ShowMovieDetails({ name, slots }) {
    return (
        <div>
            <div className="description__container">
                Description
            </div>
            <div>
                {slots.length > 0 && slots[0].map((slot, i) => (<TimeSlot key={i} slot={slot} />))}
            </div>
        </div>
    )
}
