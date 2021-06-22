import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { clearModalAction, goBackAction } from '../../actions/ModalActions';

export default function Modal({ children }) {
    const { modalData, modalDataDispatch } = useContext(ModalContext);
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
                <div className="modal__content">{children}</div>
            </div>
        </div>
    )
}
