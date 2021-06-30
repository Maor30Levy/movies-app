import React, { useState } from 'react';

export default function QueryItems({ itemType, getItems, inputType, isChecked, setIsChecked, setAbleSubmit, getItemsParams }) {
    const items = getItems(getItemsParams);
    const [diaplayItems, setDisplayItems] = useState([...items]);


    const filterItems = (event) => {
        const value = event.target.value;
        if (value === '') {
            setDisplayItems(items);
            setAbleSubmit(Object.keys(isChecked).length > 0);
        } else {
            const filter = items.filter((item) => (item.name.toLowerCase().includes(value.toLowerCase())));
            setDisplayItems(filter);
            setAbleSubmit((Object.keys(isChecked).length > 0) && (filter.length > 0))
        }

    };

    const onChangeChecked = (event) => {
        const id = event.target.id;
        if (inputType === "radio") {
            const record = {};
            record[id] = true;
            setAbleSubmit(true);
            setIsChecked(record);
        }
        else if (inputType === "checkbox") {
            if (event.target.checked) {
                const record = isChecked;
                record[id] = true;
                setIsChecked(record);
                setAbleSubmit(true);
            } else {
                const record = isChecked;
                delete record[id];
                setIsChecked(record);
                setAbleSubmit(Object.keys(record).length > 0);
            }
        }

    }
    return (
        <div className="item-query">
            <div className="query">
                <input placeholder={"Find " + itemType} onInput={filterItems} />
            </div>
            <div className="options__container">{
                diaplayItems.map((item, i) => (
                    <div key={i} className="query__option">
                        <input id={item.id} type={inputType} onChange={onChangeChecked} checked={isChecked[i]} /> {item.name}
                    </div>
                ))
            }</div>
        </div>
    )
};
