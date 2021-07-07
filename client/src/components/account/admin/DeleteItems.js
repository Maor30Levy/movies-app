import React, { useState } from 'react';
import QueryItems from './QueryItems';

export default function DeleteItems({ itemType, getItems, getItemsParams, onSubmitFunc }) {
    const [ableSubmit, setAbleSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const onClickClear = () => {
        setIsChecked({});
        setAbleSubmit(false);
    };

    const onClickSubmit = () => {
        const itemsToSubmit = Object.keys(isChecked);
        onSubmitFunc(itemsToSubmit)
    }

    return (
        <div className="update-item">
            <QueryItems
                itemType={itemType}
                getItems={getItems}
                inputType={"checkbox"}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                setAbleSubmit={setAbleSubmit}
                getItemsParams={getItemsParams}
            />
            <div className="update-item__buttons">
                <button onClick={onClickClear}>Clear</button>
                <button disabled={!ableSubmit} onClick={onClickSubmit}>Delete</button>
            </div>
        </div>
    )
}
