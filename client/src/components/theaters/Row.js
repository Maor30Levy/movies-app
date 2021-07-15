import React, { useContext } from 'react'
import { setDataAction } from '../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../actions/ModalActions';
import { DataContext } from '../../contexts/DataContext';
import { ModalContext } from '../../contexts/ModalContext';
import { UserContext } from '../../contexts/UserContext';
import { getData, reserveSeat } from '../../server/utils';

export default function Row({ seats, row, slotIndex, day, movieID, theaterID, setErrorMessage }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const { userData } = useContext(UserContext);
    const { contentDataDispatch } = useContext(DataContext);

    const onClickSeat = async (event) => {
        setErrorMessage("")
        const seat = event.target.id;
        const cell = parseInt((row - 1) * 12) + parseInt(seat) - 1;
        const orderDetails = {
            cell,
            day,
            hourIndex: slotIndex,
            movieID,
            theaterID
        }
        try {
            await reserveSeat(userData.token, orderDetails);
            const availabilityData = await getData('timeslots');
            contentDataDispatch(setDataAction({ availabilityData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "Reservation",
                props: { orderDetails, row, seat }
            }));
        } catch (err) {
            setErrorMessage(err.response?.data.message || err.message)

        }

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
