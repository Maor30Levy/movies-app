import React, { useContext, useState } from 'react';
import { goForwardAction } from '../../../actions/ModalActions';
import { ModalContext } from '../../../contexts/ModalContext';
import QueryItems from './QueryItems';

export default function UpdateItem({ itemType, getItems, elementName, getItemsParams, }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const [ableSubmit, setAbleSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const onClickClear = () => {
        setIsChecked({});
        setAbleSubmit(false);
    };

    const onClichSubmit = () => {
        modalDataDispatch(goForwardAction({
            elementName,
            props: { theaterID: Object.keys(isChecked)[0] }
        }))
    }

    return (
        <div className="update-item">
            <QueryItems
                itemType={itemType}
                getItems={getItems}
                inputType={"radio"}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                setAbleSubmit={setAbleSubmit}
                getItemsParams={getItemsParams}
            />
            <div className="update-item__buttons">
                <button onClick={onClickClear}>Clear</button>
                <button disabled={!ableSubmit} onClick={onClichSubmit}>Update</button>
            </div>
        </div>
    )
}
