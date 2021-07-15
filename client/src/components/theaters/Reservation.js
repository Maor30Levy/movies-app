import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { getMovieByID, getTheaterByID } from '../../server/utils';

export default function Reservation({ orderDetails, row, seat }) {
    const { contentData } = useContext(DataContext);
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",];
    const {
        day,
        hourIndex,
        movieID,
        theaterID
    } = orderDetails

    const { name } = getMovieByID(movieID, contentData.moviesData);
    const theater = getTheaterByID(theaterID, contentData.theatersData);
    const slots = contentData.availabilityData.filter(({ owner, theater }) => (owner === movieID && theater === theaterID))[0].slots;
    const indexOfDay = (element) => (Object.keys(element)[0] === day);

    const index = slots.findIndex(indexOfDay);
    const { startTime } = slots[index][day][hourIndex] || "";
    return (
        <div>
            Order Details:
            <div>Movie: {name}</div>
            <div>Location: {theater.name},{theater.location}</div>
            <div>Time: {week[day - 1]}, at {startTime}</div>
            <div>Row: {row} , Seat:{seat}</div>
            <div>Reservetion ID: {nanoid()}</div>

            <div>Enjoy!</div>

        </div>
    )
}
