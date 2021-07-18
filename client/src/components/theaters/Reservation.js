import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { getMovieByID, getTheaterByID } from '../../server/utils';
import QRCode from 'qrcode';

export default function Reservation({ orderDetails, row, seat }) {
    const { contentData } = useContext(DataContext);
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",];
    const [qr, setQR] = useState('');
    const {
        day,
        hourIndex,
        movieID,
        theaterID
    } = orderDetails;


    const { name } = getMovieByID(movieID, contentData.moviesData);
    const theater = getTheaterByID(theaterID, contentData.theatersData);
    const slots = contentData.availabilityData.filter(({ owner, theater }) => (owner === movieID && theater === theaterID))[0].slots;
    const indexOfDay = (element) => (Object.keys(element)[0] === day);

    const index = slots.findIndex(indexOfDay);
    const { startTime } = slots[index][day][hourIndex] || "";
    useEffect(() => {
        orderDetails.id = nanoid();
        orderDetails.name = name;
        orderDetails.startTime = startTime;
        QRCode.toDataURL(JSON.stringify(orderDetails))
            .then(url => {
                setQR(url)
            })
            .catch(err => {
                console.error(err)
            })
    }, [orderDetails, name, startTime])
    return (
        <div className="reservation">
            <h1>Order Details:</h1>
            <div><h3>Movie:</h3> {name}</div>
            <div><h3>Location:</h3> {theater.name}, {theater.location}</div>
            <div><h3>Time:</h3> {week[day - 1]}, at {startTime}</div>
            <div><h3>Seat: </h3>Row: {row} , Seat:{seat}</div>
            <div><h3>Reservetion ID:</h3> {orderDetails.id}</div>
            <img className="qrcode" src={qr} alt="QRCODE" />
            <img className="ok-reservation" src="./reservation/ok-icon.png" alt="ok-icon" />
            <h4>Enjoy !</h4>

        </div>
    )
}
