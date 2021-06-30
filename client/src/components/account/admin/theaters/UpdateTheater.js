import React, { useContext } from 'react'
import UpdateItem from '../UpdateItem';
import { getLocations, getTheatersByLocation } from '../../../../server/utils';
import { ModalContext } from '../../../../contexts/ModalContext';
import { goForwardAction } from '../../../../actions/ModalActions';

export default function UpdateTheater() {
    const { modalDataDispatch } = useContext(ModalContext);
    const onClickSubmit = () => {
        console.log('submit');
    }
    const locations = getLocations();;
    const onClickLocation = (event) => {
        const location = event.target.innerText;
        modalDataDispatch(goForwardAction({
            elementName: "UpdateItem",
            props: {
                itemType: "Theaters",
                getItems: getTheatersByLocation,
                onSubmit: onClickSubmit,
                getItemsParams: location
            }
        }))
    }

    return (
        <div>
            <h3>Pick a location:</h3>
            <div>
                {locations.length > 0 && locations.map((location, i) => (
                    <div key={i} className="modal__option" onClick={onClickLocation}>{location}</div>
                ))}
            </div>
        </div>
    )
}
