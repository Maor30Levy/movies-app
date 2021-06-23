import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { clearModalAction, goBackAction } from '../../actions/ModalActions';
import ShowMovieDetails from '../theaters/ShowMovieDetails';
import Seats from '../theaters/Seats';
import Reservation from '../theaters/Reservation';
import Default from '../main/Default';

export default function Modal({ }) {
    const { modalData, modalDataDispatch } = useContext(ModalContext);
    const components = {
        Default,
        ShowMovieDetails,
        Seats,
        Reservation
    };
    const [children, setChildren] = useState({ elementName: 'Default', props: {} });
    useEffect(() => {
        setChildren(modalData.children);

    }, [modalData.children])
    const onClickCloseModal = () => {
        modalDataDispatch(clearModalAction());
    };
    const onClickGoBack = (event) => {
        modalDataDispatch(goBackAction());
        event.stopPropagation();
    };
    return (
        <div className="modal__container">
            <div className="modal">
                <div className="modal__header">
                    {modalData.back.length > 0 && <div className="modal__back" onClick={onClickGoBack}>Back</div>}
                    <div className="close-modal__container" onClick={onClickCloseModal}>
                        <div className="close-modal" ></div>
                    </div>
                </div>
                <div className="modal__content">{React.createElement(components[children.elementName], children.props)}</div>
            </div>
        </div>
    )
}
