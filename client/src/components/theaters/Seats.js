import React from 'react'
import Row from './Row';

export default function Seats({ seats }) {
    const getRows = (seats) => {
        const result = []
        for (let i = 0; i < seats.length;) {
            const row = (Math.floor(i / 12) + 1);
            result.push(<Row key={row} seats={seats.slice(i, i + 12)} row={row} />);
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
        </div>

    )
}
