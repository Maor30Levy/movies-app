import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FooterIcon({ name }) {
    const nameLower = name.toLowerCase();
    return (
        <NavLink to={`/${nameLower}`} className="nav" activeClassName="nav_active">
            <img className="icon" src={`./icons/footer/‏‏${nameLower}_icon.png`} alt="icon" />
            <img className="icon__active" src={`./icons/footer/‏‏${nameLower}_icon__active.png`} alt="icon" />
            <div>{name}</div>
        </NavLink>
    )
}
