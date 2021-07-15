import React, { useContext } from 'react'
import ShowTheaters from './ShowTheaters';
import { UserContext } from '../../contexts/UserContext';
import { setLocationAction } from '../../actions/UserActions';
import { nanoid } from 'nanoid';
import { DataContext } from '../../contexts/DataContext';




export default function Theaters() {
    const { contentData } = useContext(DataContext);
    const { userData, userDataDispatch } = useContext(UserContext);
    const getTheaters = (requestedLocation) => {
        return contentData.theatersData.filter(({ location }) => (location === requestedLocation));
    };
    const locations = contentData.locationsData;
    const onClickLocation = (event) => {
        const location = event.target.previousSibling.value;
        userDataDispatch(setLocationAction(location));
    }
    return (
        <div className="theaters__main">
            {userData.location === '' && <div className="pick-location">
                <h3>Pick a location:</h3>
                <select>
                    {locations.map((location, i) =>
                        (<option key={nanoid()}>{location}</option>)
                    )}
                </select>
                <button onClick={onClickLocation}>Go</button>
            </div>}
            {userData.location !== '' && <ShowTheaters
                theaters={getTheaters(userData.location)}
                location={userData.location}
            />}
        </div>
    )
}
