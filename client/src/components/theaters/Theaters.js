import React, { useContext } from 'react'
import { theaters } from '../../data/theaters'
import { locations } from '../../data/locations';
import ShowTheaters from './ShowTheaters';
import { UserContext } from '../../contexts/UserContext';
import { setLocationAction } from '../../actions/UserActions';
import { nanoid } from 'nanoid';

const getLocations = () => (locations);
const getTheaters = (requestedLocation) => {
    return theaters.filter(({ location }) => (location === requestedLocation));
};


export default function Theaters() {
    const { userData, userDataDispatch } = useContext(UserContext);
    const locations = getLocations();
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
