import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FooterIcon({ name }) {
    const nameLower = name.toLowerCase().trim();
    return (
        <NavLink to={`/${nameLower}`} className="nav" activeClassName="nav_active">
            <img className="icon" src={`./icons/footer/‏‏${name}.png`} alt="icon" />
            <img className="icon__active" src={`./icons/footer/‏‏${name}__active.png`} alt="icon" />
            <div>{name}</div>
        </NavLink>
    )
}
