import React from 'react'
import { getAllTheaterTimeSlots } from '../../../../server/utils'
import UpdateTimeSlot from './UpdateTimeSlot';
import { nanoid } from 'nanoid';


export default function UpdateAvailableTimeSlots({ oldMoviesList, theaterDetails, theaterID }) {
    const timeSlots = getAllTheaterTimeSlots(theaterID, oldMoviesList);
    return (
        <div>
            {timeSlots.length > 0 && timeSlots.map((timeSlot, i) => (
                <UpdateTimeSlot key={nanoid()} movieTimeSlots={timeSlot} seats={theaterDetails.seats} />
            ))}
        </div>
    )
}
