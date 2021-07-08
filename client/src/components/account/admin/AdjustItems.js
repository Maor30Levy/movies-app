import React, { useState } from 'react';
import QueryItems from './QueryItems';

export default function DeleteItems({ itemType, getItems, getItemsParams, onSubmitFunc, adjustType }) {
    const [ableSubmit, setAbleSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const onClickClear = () => {
        setIsChecked({});
        setAbleSubmit(false);
    };

    const onClickSubmit = () => {
        const itemsToSubmit = getItemsToSubmit(adjustType);
        onSubmitFunc(itemsToSubmit)
    }

    const getItemsToSubmit = (adjustType) => {
        switch (adjustType) {
            case "Update": return Object.keys(isChecked)[0];
            default: return Object.keys(isChecked);
        }
    }

    const getInputType = (adjustType) => {
        switch (adjustType) {
            case "Update": return "radio"
            default: return "checkbox"
        }
    };

    return (
        <div className="update-item">
            <QueryItems
                itemType={itemType}
                getItems={getItems}
                inputType={getInputType(adjustType)}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                setAbleSubmit={setAbleSubmit}
                getItemsParams={getItemsParams}
            />
            <div className="update-item__buttons">
                <button onClick={onClickClear}>Clear</button>
                <button disabled={!ableSubmit} onClick={onClickSubmit}>{adjustType}</button>
            </div>
        </div>
    )
}
