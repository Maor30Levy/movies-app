import React from 'react'

export default function Row({ seats, row }) {

    const onClickSeat = (event) => {
        const seat = event.target.id;
        console.log(`Row: ${row}, Seat: ${seat}`);
    }

    return (
        <div className="row__container">
            <div className="row__number">{row}</div>
            <div className="row">
                {seats.map((seat, i) => (
                    <div
                        id={i + 1}
                        key={"seat" + i}
                        className={(seat ? "green" : "red") + " seat"}
                        onClick={seat ? onClickSeat : () => { }}
                    />
                ))}
            </div>
        </div>
    )
}
