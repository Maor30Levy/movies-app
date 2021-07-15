import React, { useContext, useState } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { addNewLocation, checkForExistingLocation, getData } from '../../../../server/utils';

export default function AddLoction() {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const { userData } = useContext(UserContext);

    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onInputLocation = (event) => {
        if (errorMessage !== "") setErrorMessage("")
        setLocation(event.target.value)
    };

    const onClickAddLocation = async () => {
        setErrorMessage("")
        if (!checkForExistingLocation(location, contentData.locationsData)) {
            try {
                await addNewLocation(userData.token, location);
                const locationsData = await getData('locations');
                contentDataDispatch(setDataAction({ locationsData }));
                modalDataDispatch(goForwardAction({
                    elementName: "AddNewTheaterStats",
                    props: {
                        location
                    }
                }))
            } catch (err) {
                setErrorMessage(err.response?.data.message || err.message)
            }

        } else setErrorMessage("Location already exists!")
    }
    return (
        <div>
            <h3>Enter Location name:</h3>
            <input onInput={onInputLocation} />
            <button onClick={onClickAddLocation} disabled={location === ''}>Add</button>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}

        </div>
    )
}
