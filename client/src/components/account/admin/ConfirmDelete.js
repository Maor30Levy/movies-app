import React, { useContext } from 'react'
import { clearModalAction } from '../../../actions/ModalActions';
import { ModalContext } from '../../../contexts/ModalContext';

export default function ConfirmDelete({ onDeleteFunc, onDeleteFuncData, items }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickCancel = () => {
        modalDataDispatch(clearModalAction());
    };

    const onClickDelete = async () => {
        await onDeleteFunc(onDeleteFuncData);
        modalDataDispatch(clearModalAction());
    }

    return (
        <div>
            <h3>Are you sure you want to delete:</h3>
            <div>
                {items.length > 0 && items.map((item, i) => {
                    const seperator = i === items.length - 1 ? "." : ", ";
                    return (`${item}${seperator}`)
                })}
            </div>
            <div className="update-item__buttons">
                <button className="delete-button" onClick={onClickDelete}>Delete</button>
                <button onClick={onClickCancel}>Cancel</button>
            </div>
        </div>
    )
}
