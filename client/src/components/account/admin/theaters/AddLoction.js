import React, { useContext, useState } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { addNewLocation, checkForExistingLocation } from '../../../../server/utils';

export default function AddLoction() {
    const { modalDataDispatch } = useContext(ModalContext);

    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onInputLocation = (event) => {
        if (errorMessage !== "") setErrorMessage("")
        setLocation(event.target.value)
    };

    const onClickAddLocation = () => {
        setErrorMessage("")
        if (!checkForExistingLocation(location)) {
            addNewLocation(location);
            modalDataDispatch(goForwardAction({
                elementName: "AddNewTheaterStats",
                props: {
                    location
                }
            }))

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
