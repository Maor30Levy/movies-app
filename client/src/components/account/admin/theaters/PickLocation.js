import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { DataContext } from '../../../../contexts/DataContext';

export default function PickLocation({ clickLoactionFunc }) {
    const { contentData } = useContext(DataContext);

    const locations = contentData.locationsData;
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
