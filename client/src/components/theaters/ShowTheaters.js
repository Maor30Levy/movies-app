import React, { useContext } from 'react'
import { setLocationAction } from '../../actions/UserActions';
import { UserContext } from '../../contexts/UserContext';
import { ModalContext } from '../../contexts/ModalContext';
import Theater from './Theater';
import Modal from '../main/Modal';

export default function ShowTheaters({ theaters, location }) {
    const { userDataDispatch } = useContext(UserContext);
    const { modalData } = useContext(ModalContext);
    const onClickChangeLocation = () => {
        userDataDispatch(setLocationAction(''));
    }

    return (
        <div className="theaters__container">
            <div className="theaters__location">
                <h3>Theaters in {location}</h3>
                <div className="change-location" onClick={onClickChangeLocation}>Change Location</div>
            </div>
            {theaters.map(
                (theater) =>
                (<Theater
                    key={theater.id}
                    id={theater.id}
                    name={theater.name}
                    movies={theater.movies}
                />)
            )}
            {modalData.isModal && <Modal />}
        </div>
    )
}
