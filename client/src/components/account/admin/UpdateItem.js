import React, { useState } from 'react';
import QueryItems from './QueryItems';

export default function UpdateItem({ itemType, getItems, onSubmit, getItemsParams }) {
    const [ableSubmit, setAbleSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const onClickClear = () => {
        setIsChecked({});
        setAbleSubmit(false);
    };
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
                <button disabled={!ableSubmit} onClick={onSubmit}>Update</button>
            </div>
        </div>
    )
}
