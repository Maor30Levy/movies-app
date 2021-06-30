import React, { useState } from 'react';
import QueryItems from './QueryItems';

export default function UpdateItem({ itemType, getItems, onSubmit }) {
    const [ableSubmit, setAbleSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const onClickClear = () => {
        setIsChecked({});
        setAbleSubmit(false);
    };
    return (
        <div>
            <QueryItems
                itemType={itemType}
                getItems={getItems}
                inputType={"radio"}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                setAbleSubmit={setAbleSubmit}
            />
            <button onClick={onClickClear}>Clear</button>
            <button disabled={!ableSubmit} onClick={onSubmit}>Update</button>
        </div>
    )
}
