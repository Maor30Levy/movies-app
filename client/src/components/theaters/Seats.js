import React, { useState } from 'react'
import Row from './Row';

export default function Seats({ seats, slotIndex, day, movieID, theaterID }) {
    const [errorMessage, setErrorMessage] = useState("");
    const getRows = (seats) => {
        const result = []
        for (let i = 0; i < seats.length;) {
            const row = (Math.floor(i / 12) + 1);
            result.push(<Row key={row} seats={seats.slice(i, i + 12)}
                row={row} slotIndex={slotIndex} day={day}
                movieID={movieID} theaterID={theaterID}
                setErrorMessage={setErrorMessage}
            />);
            i += 12;
        }
        return result

    };

    return (
        <div className="seats">
            <div className="screen"></div>
            <div className="seats__container">
                {seats.length > 0 && getRows(seats).map((row) => (row))}
            </div>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>

    )
}
