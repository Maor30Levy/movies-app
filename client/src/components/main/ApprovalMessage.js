import React, { useContext } from 'react'
import { clearModalAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';

export default function ApprovalMessage({ message }) {
    const { modalDataDispatch } = useContext(ModalContext);

    setTimeout(() => {
        modalDataDispatch(clearModalAction());
    }, 1500)
    return (
        <div className="approval-message">
            <h1>{message}</h1>
        </div>
    )
}
