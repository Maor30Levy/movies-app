import { nanoid } from 'nanoid';
import React from 'react';
import { getLocations } from '../../../../server/utils';

export default function PickLocation({ clickLoactionFunc }) {
    const locations = getLocations();
    const onClickLocation = (event) => {
        const location = event.target.innerText;
        clickLoactionFunc(location)
    };
    return (
        <div className="pick-location__container">
            <h3>Pick a location:</h3>
            <div>
                {locations.length > 0 && locations.map((location) => (
                    <div key={nanoid()} className="modal__option" onClick={onClickLocation}>{location}</div>
                ))}
            </div>
        </div>
    )
}
