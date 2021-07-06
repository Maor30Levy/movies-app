import React, { useContext, useEffect, useState } from 'react'
import { getAllTheaterTimeSlots } from '../../../../server/utils'
import UpdateTimeSlot from './UpdateTimeSlot';
import { nanoid } from 'nanoid';
import SlotHoursContextProvider from '../../../../contexts/SlotHoursContext'
import { ModalContext } from '../../../../contexts/ModalContext';
import { clearModalAction } from '../../../../actions/ModalActions';

export default function UpdateAvailableTimeSlots({ oldMoviesList, theaterDetails, theaterID }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const timeSlots = getAllTheaterTimeSlots(theaterID, theaterDetails.movies);
    const [newTimeSlots, setNewTimeSlots] = useState([...timeSlots]);
    const [isAllMoviesUpdated, setisAllMoviesUpdated] = useState(false);
    const setNewSlots = (index, timeSlots) => {
        const newSlots = [...newTimeSlots];
        newSlots[index].slots.slots = timeSlots;
        setNewTimeSlots(newSlots);
    };
    useEffect(() => {
        let update = true;
        for (let movie of newTimeSlots) {
            if (movie.slots.slots.length === 0) update = false;
            setisAllMoviesUpdated(update)
        }
    }, [newTimeSlots])
    const onClickUpdate = () => {
        console.log(newTimeSlots)
        modalDataDispatch(clearModalAction());
    }

    return (
        <div className="update-available-timeslots">
            {timeSlots.length > 0 && timeSlots.map((timeSlot, i) => (
                <SlotHoursContextProvider key={nanoid()}>
                    <UpdateTimeSlot movieTimeSlots={timeSlot} seats={theaterDetails.seats} setTimeSlots={setNewSlots} index={i} />
                </SlotHoursContextProvider>
            ))}
            <button disabled={!isAllMoviesUpdated} onClick={onClickUpdate}>Update Theater</button>
        </div>
    )
}
