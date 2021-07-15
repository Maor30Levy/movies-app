import React from 'react';

export default function Reservation({ orderDetails }) {
    const {
        cell,
        day,
        hourIndex,
        movieID,
        theaterID
    } = orderDetails

    return (
        <div>
            {cell,
                day,
                hourIndex,
                movieID,
                theaterID}
        </div>
    )
}
