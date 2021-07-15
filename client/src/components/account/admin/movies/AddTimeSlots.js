import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import SlotHoursContextProvider from '../../../../contexts/SlotHoursContext'
import { UserContext } from '../../../../contexts/UserContext';
import { addAvailability, getData, getTheaterByID } from '../../../../server/utils';
import AddTimeSlot from './AddTimeSlot';

export default function AddTimeSlots({ id, theaters }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const { userData } = useContext(UserContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);

    const setTheatersSlots = (numOfTheaters) => {
        const result = []
        for (let i = 0; i < numOfTheaters; i++) result.push(undefined);
        return result
    };

    const [isDisabled, setIsDisabled] = useState(true);
    const isValidTimeSlot = (availability) => {
        let valid = true;
        for (let slot of availability) {
            if (!slot) valid = false;
        }
        return valid;
    }

    const [availability, setAvailability] = useState(setTheatersSlots(theaters.length))
    const [errorMessage, setErrorMessage] = useState("");

    const setSlot = (index, slot) => {
        const newAvailability = availability;
        newAvailability[index] = slot;
        setAvailability(newAvailability);
        setIsDisabled(!(isValidTimeSlot(newAvailability)))
    };

    const onClickAdd = async () => {
        setErrorMessage("");
        try {
            await addAvailability(id, {
                timeSlot: availability
            }, userData.token);
            const availabilityData = await getData('timeslots');
            const theatersData = await getData('theaters');
            contentDataDispatch(setDataAction({ availabilityData, theatersData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Timeslot added!" }
            }));
        } catch (err) {
            if (err.response) setErrorMessage(err.response.data.message);
            else setErrorMessage(err.message);

        }

    }

    return (
        <div>
            {theaters.length > 0 && theaters.map((theaterId, i) => {
                const { name, location, seats } = getTheaterByID(theaterId, contentData.theatersData)
                return (
                    <SlotHoursContextProvider key={nanoid()}>
                        <AddTimeSlot
                            name={`${name} - ${location}`}
                            seats={seats}
                            index={i}
                            setTimeSlots={setSlot}
                            theaterID={theaterId}
                        />
                    </SlotHoursContextProvider>
                )
            })}
            <button
                disabled={isDisabled}
                onClick={onClickAdd}
            >Add Time Slots</button>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}
