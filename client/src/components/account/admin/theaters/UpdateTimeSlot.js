import React from 'react'
import { getMovieByID } from '../../../../server/utils'

export default function UpdateTimeSlot({ movieTimeSlots }) {
    const { name } = getMovieByID(movieTimeSlots.movieID);
    return (
        <div>
            <h3>{name}</h3>
        </div>
    )
}
