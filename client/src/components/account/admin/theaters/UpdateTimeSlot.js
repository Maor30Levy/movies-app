import React, { useState } from 'react'
import { getMovieByID } from '../../../../server/utils'
import { nanoid } from 'nanoid';
import TimeSlot from '../../../theaters/TimeSlot';
import AddHour from './AddHour';
export default function UpdateTimeSlot({ movieTimeSlots, seats }) {
    const { name } = getMovieByID(movieTimeSlots.movieID);
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",];
    const getDays = (displaySlots) => {
        const result = [];
        for (let slot of displaySlots[0])
            result.push(parseInt(Object.keys(slot)[0]) - 1)
        return result;
    }

    const slots = [movieTimeSlots.slots.slots];
    const [displaySlots, setDisplaySlots] = useState([...slots]);
    const [existingDays, setExistingDays] = useState(getDays(displaySlots));
    const [addDay, setAddDay] = useState(false);
    const [hours, setHours] = useState([]);
    const onSelectDay = (event) => {
        const day = week.indexOf(event.target.value) + 1;
    };
    const onClickaddDay = () => {
        setAddDay(existingDays.length < 7)
    };


    const getHours = (hours) => {
        const result = [];
        for (let hour of hours) {
            const slot = {}
            const hh = parseInt(hour.children[0].value);
            const mm = hour.children[1].value;
            slot.startTime = `${hh}:${mm}`;
            slot.endTime = `${hh + 3}:${mm}`;
            slots.seats = createSeats(seats);
            result.push(slot);
        }
        result.sort((a, b) => (a.startTime < b.startTime))
        return result;
    };

    const createSeats = (seatsNum) => {
        const seats = [];
        for (let i = 0; i < seatsNum; i++)seats.push(true);
        return seats;
    };

    const onClickSubmitDay = (event) => {
        const day = event.target.parentElement.firstChild.value;
        const keyDay = week.indexOf(day) + 1;
        const hoursContainerElement = event.target.parentElement.children[1];
        const showHours = getHours(hoursContainerElement.children);
        const slot = {};
        slot[keyDay] = showHours;
        const newSlots = [...displaySlots[0]];
        newSlots.push(slot);
        newSlots.sort((a, b) => (Object.keys(a)[0] > Object.keys(b)[0]));
        setDisplaySlots([newSlots]);
        setHours([]);
        setExistingDays(getDays([newSlots]));
        setAddDay(false);
    };


    const removeHour = (event) => {
        if (event.target.children[0].children[0])
            console.log(hours);
        event.stopPropagation();
    };

    const onClickAddHour = () => {
        setHours([].concat(hours, <AddHour key={nanoid()} removeHour={removeHour} />))
    };

    return (
        <div>
            <h3>{name}</h3>
            {
                displaySlots.length > 0 && displaySlots[0].map((slot) => {

                    return (
                        <TimeSlot key={nanoid()} slot={slot} />
                    )
                })
            }
            {!!addDay && <div className="add-day__container">
                <select onChange={onSelectDay}>
                    {week.filter((week, i) => (!existingDays.includes(i))).map((day) => (<option key={nanoid()}>{day}</option>))}
                </select>
                <div className="add-time-slot">
                    {hours.length > 0 && hours.map((hour) => (hour))}
                </div>

                <div className="add-time-slot__add-hour" onClick={onClickAddHour}>+</div>

                <button className="add-day__submit" onClick={onClickSubmitDay} disabled={!hours.length > 0}>Add</button>
            </div>}
            <button className="add-day__button" onClick={onClickaddDay} disabled={addDay || existingDays.length > 6}>Add Day</button>
        </div>
    )
}
