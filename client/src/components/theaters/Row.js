import React, { useContext } from 'react'
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';

export default function Row({ seats, row }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const onClickSeat = (event) => {
        const seat = event.target.id;
        modalDataDispatch(goForwardAction({ elementName: 'Reservation', props: { row, seat } }));
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
