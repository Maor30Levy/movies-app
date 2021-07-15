import React, { useContext, useEffect, useState } from 'react';
import { getMovieByID } from '../../../../server/utils';
import { nanoid } from 'nanoid';
import TimeSlot from '../../../theaters/TimeSlot';
import AddHour from './AddHour';
import { SlotHoursContext } from '../../../../contexts/SlotHoursContext';
import { setHoursAction } from '../../../../actions/SlotHoursActions';
import { DataContext } from '../../../../contexts/DataContext';

export default function UpdateTimeSlot({ movieTimeSlots, seats, setTimeSlots, index, newTimeSlots }) {

    const { contentData } = useContext(DataContext);
    const { hoursData, hoursDataDispatch } = useContext(SlotHoursContext)
    const { name } = getMovieByID(movieTimeSlots.movieID, contentData.moviesData);
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",];
    const getDays = (displaySlots) => {
        const result = [];
        for (let slot of displaySlots)
            result.push(parseInt(Object.keys(slot)[0]) - 1)
        return result;
    }
    const slots = movieTimeSlots.slots;
    const [displaySlots, setDisplaySlots] = useState([...slots]);
    const [existingDays, setExistingDays] = useState(getDays(displaySlots));
    const [addDay, setAddDay] = useState(false);
    const [day, setDay] = useState('Pick A Day');
    useEffect(() => {
        setDisplaySlots(newTimeSlots[index].slots);

    }, [newTimeSlots, index]);
    const onSelectDay = (event) => {
        setDay(event.target.value);
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
            slot.seats = createSeats(seats);
            result.push(slot);
        }
        result.sort((a, b) => {
            const h1 = a.startTime.split(':');
            const h2 = b.startTime.split(':');
            return (parseInt(h1[0]) > parseInt(h2[0]))
        })
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
        const newSlots = displaySlots;
        newSlots.push(slot);
        newSlots.sort((a, b) => (Object.keys(a)[0] > Object.keys(b)[0]));
        console.log(newSlots)
        setDisplaySlots([...newSlots]);
        hoursDataDispatch(setHoursAction([]));
        setExistingDays(getDays(newSlots));
        setAddDay(false);
        setTimeSlots(index, newSlots)
    };


    const removeHour = (event, h) => {
        if (!!event.target.children[0]?.children[0]) {
            const e = (h.filter((hour) => (hour.props.id === event.target.id)))[0];
            const index = h.indexOf(e);
            const newHours = [].concat(h.slice(0, index), h.slice(index + 1) || []);
            hoursDataDispatch(setHoursAction(newHours));
        }

        event.stopPropagation();
    };

    const onClickAddHour = () => {
        hoursDataDispatch(setHoursAction([].concat(hoursData.hours, <AddHour key={nanoid()} removeHour={removeHour} id={nanoid()} />)));
    };

    return (
        <div className="update-time-slot__container">
            <h3>{name}</h3>
            <div className="update-time-slot__timeslots">
                {
                    displaySlots.length > 0 && displaySlots.map((slot) => {

                        return (
                            <TimeSlot key={nanoid()} slot={slot} onClickFunc={() => { }} />
                        )
                    })
                }
            </div>
            {!!addDay && <div className="add-day__container">
                <select onChange={onSelectDay} value={day}>
                    <option>{'Pick A Day'}</option>
                    {week.filter((week, i) => (!existingDays.includes(i))).map((day) => (<option key={nanoid()}>{day}</option>))}
                </select>
                <div className="add-time-slot">
                    {hoursData.hours.length > 0 && hoursData.hours.map((hour) => (hour))}
                </div>

                <div className="add-time-slot__add-hour" onClick={onClickAddHour}>+</div>

                <button className="add-day__submit" onClick={onClickSubmitDay} disabled={!hoursData.hours.length > 0 || day === 'Pick A Day'}>Add</button>
            </div>}
            <button className="add-day__button" onClick={onClickaddDay} disabled={addDay || existingDays.length > 6}>Add Day</button>
        </div>
    )
}
