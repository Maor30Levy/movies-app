import React, { useContext, useEffect, useState } from 'react'
import { getAllTheaterTimeSlots, getData, updateTheater } from '../../../../server/utils'
import UpdateTimeSlot from './UpdateTimeSlot';
import { nanoid } from 'nanoid';
import SlotHoursContextProvider from '../../../../contexts/SlotHoursContext'
import { ModalContext } from '../../../../contexts/ModalContext';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { UserContext } from '../../../../contexts/UserContext';
import { setDataAction } from '../../../../actions/DataActions';

export default function UpdateAvailableTimeSlots({ oldMoviesList, theaterDetails, id }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const { userData } = useContext(UserContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState('');
    const timeSlots = getAllTheaterTimeSlots(id, theaterDetails.movies, contentData.availabilityData);
    const [newTimeSlots, setNewTimeSlots] = useState([...timeSlots]);
    const [isAllMoviesUpdated, setisAllMoviesUpdated] = useState(false);
    const setNewSlots = (index, timeSlots) => {
        const newSlots = [...newTimeSlots];
        newSlots[index].slots = timeSlots;
        newSlots[index].hasOpenSeats = true;
        setNewTimeSlots(newSlots);
    };
    useEffect(() => {
        let update = true;
        for (let movie of newTimeSlots) {
            if (movie.slots.length === 0) update = false;
            setisAllMoviesUpdated(update)
        }
    }, [newTimeSlots])
    const onClickUpdate = async () => {
        try {
            setErrorMessage("");
            await updateTheater(userData.token, id, oldMoviesList, theaterDetails, newTimeSlots);
            console.log(newTimeSlots, oldMoviesList, theaterDetails)
            const theatersData = await getData('theaters');
            const availabilityData = await getData('timeslots');
            contentDataDispatch(setDataAction({ theatersData, availabilityData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "TimeSlots updated!" }
            }));

        } catch (err) {
            if (err.response) setErrorMessage(err.response.data.message);
            else setErrorMessage(err.message);
        }

    }

    return (
        <div className="update-available-timeslots">
            {timeSlots.length > 0 && timeSlots.map((timeSlot, i) => (
                <SlotHoursContextProvider key={nanoid()}>
                    <UpdateTimeSlot movieTimeSlots={timeSlot} seats={theaterDetails.seats} setTimeSlots={setNewSlots} index={i} newTimeSlots={newTimeSlots} />
                </SlotHoursContextProvider>
            ))}
            <button disabled={!isAllMoviesUpdated} onClick={onClickUpdate}>Update Theater</button>
            {
                errorMessage !== '' && <div className="error-message">{errorMessage}</div>
            }
        </div>
    )
}
