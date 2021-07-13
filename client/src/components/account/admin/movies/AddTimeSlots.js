import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import SlotHoursContextProvider from '../../../../contexts/SlotHoursContext'
import { addAvailability, getTheaterByID } from '../../../../server/utils';
import AddTimeSlot from './AddTimeSlot';

export default function AddTimeSlots({ id, theaters }) {

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

    const setSlot = (index, slot) => {
        const newAvailability = availability;
        newAvailability[index] = slot;
        setAvailability(newAvailability);
        setIsDisabled(!(isValidTimeSlot(newAvailability)))
    };

    const onClickAdd = () => {
        addAvailability({
            id,
            timeSlot: availability
        })
    }

    return (
        <div>
            {theaters.length > 0 && theaters.map((theaterId, i) => {
                const { name, location, seats } = getTheaterByID(theaterId)
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
        </div>
    )
}
