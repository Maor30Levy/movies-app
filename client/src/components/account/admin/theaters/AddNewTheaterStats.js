import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { setDataAction } from '../../../../actions/DataActions';
import { DataContext } from '../../../../contexts/DataContext';
import { UserContext } from '../../../../contexts/UserContext';
import { addNewTheater, checkForExistingTheater, getData } from '../../../../server/utils';
import AdjustTheaterDetails from './AdjustTheaterDetails';

export default function AddNewTheaterStats({ location }) {
    const { userData } = useContext(UserContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const [addNewTheaterForm, setAddNewTheaterForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onClickAddNewTheater = () => {
        setAddNewTheaterForm(!addNewTheaterForm);
        setErrorMessage("");
    }
    const onClickSubmit = async (theaterDetails) => {
        setErrorMessage("");
        if (!checkForExistingTheater(theaterDetails.name, location, contentData.theatersData)) {
            const theater = theaterDetails;
            theater.location = location
            setAddNewTheaterForm(false);
            try {
                await addNewTheater(userData.token, theater);
                const theatersData = await getData('theaters');
                contentDataDispatch(setDataAction({ theatersData }));
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
