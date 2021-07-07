import { nanoid } from 'nanoid';
import React, { useContext } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { getLocations } from '../../../../server/utils';

export default function AddTheater() {
    const { modalDataDispatch } = useContext(ModalContext);

    const locations = getLocations();
    const onClickLocation = (event) => {
        const location = event.target.innerText;
        modalDataDispatch(goForwardAction({
            elementName: "AddNewTheaterStats",
            props: {
                // itemType: "Theaters",
                // getItems: getTheatersByLocation,
                // onSubmit: onClickSubmit,
                location,
                // elementName: "UpdateTheaterStats"
            }
        }))
    };
    return (
        <div className="pick-location__container">
            <h3>Pick a location:</h3>
            <div>
                {locations.length > 0 && locations.map((location, i) => (
                    <div key={nanoid()} className="modal__option" onClick={onClickLocation}>{location}</div>
                ))}
            </div>
        </div>
    )
}
