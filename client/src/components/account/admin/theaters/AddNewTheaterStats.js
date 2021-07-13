import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { addNewTheater, checkForExistingTheater } from '../../../../server/utils';
import AdjustTheaterDetails from './AdjustTheaterDetails';

export default function AddNewTheaterStats({ location }) {
    const { userData } = useContext(UserContext);
    const [addNewTheaterForm, setAddNewTheaterForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onClickAddNewTheater = () => {
        setAddNewTheaterForm(!addNewTheaterForm);
        setErrorMessage("");
    }
    const onClickSubmit = async (theaterDetails) => {
        setErrorMessage("");
        if (!checkForExistingTheater(theaterDetails.name, location)) {
            const theater = theaterDetails;
            theater.location = location
            setAddNewTheaterForm(false);
            try {
                await addNewTheater(userData.token, theater);
            } catch (err) {
                setErrorMessage(err.response?.data.message || err.message)

            }

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
