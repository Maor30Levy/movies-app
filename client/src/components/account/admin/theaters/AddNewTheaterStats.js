import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { addNewTheater, checkForExistingTheater } from '../../../../server/utils';
import AdjustTheaterDetails from './AdjustTheaterDetails';

export default function AddNewTheaterStats({ location }) {
    const [addNewTheaterForm, setAddNewTheaterForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onClickAddNewTheater = () => {
        setAddNewTheaterForm(!addNewTheaterForm);
        setErrorMessage("");
    }
    const onClickSubmit = (theaterDetails, theaterID, movies) => {
        setErrorMessage("");
        if (!checkForExistingTheater(theaterDetails.name, location)) {
            const theater = theaterDetails;
            theater.id = theaterID;
            theater.location = location
            setAddNewTheaterForm(false)
            addNewTheater(theater);
        } else setErrorMessage('Theater already exists!');

    }
    return (
        <div className="add-new-theater__container">
            <button onClick={onClickAddNewTheater}>{addNewTheaterForm ? "-" : "+"} New Theater</button>
            {addNewTheaterForm && <div className="add-new-theater-form">
                <AdjustTheaterDetails
                    theaterID={nanoid()}
                    submitText={"Add Theater"}
                    onClickSubmitFunc={onClickSubmit}
                />
            </div>}
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}
