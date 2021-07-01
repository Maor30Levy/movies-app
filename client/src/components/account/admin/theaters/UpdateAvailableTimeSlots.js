import React from 'react'
import { getAllTheaterTimeSlots } from '../../../../server/utils'
import UpdateTimeSlot from './UpdateTimeSlot';
export default function UpdateAvailableTimeSlots({ oldMoviesList, theaterDetails, theaterID }) {
    const timeSlots = getAllTheaterTimeSlots(theaterID, oldMoviesList);
    console.log(timeSlots)
    return (
        <div>
            {timeSlots.length > 0 && timeSlots.map((timeSlot, i) => (
                <UpdateTimeSlot key={i} movieTimeSlots={timeSlot} />
            ))}
        </div>
    )
}
