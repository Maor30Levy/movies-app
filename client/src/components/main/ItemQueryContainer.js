import { nanoid } from 'nanoid';
import React from 'react';

export default function ItemQueryContainer({ itemType, items, itemInput, onClickFunc }) {
    const filterdItems = itemInput === "" ? [] : items.filter(({ name }) => (name.trim().toLowerCase().includes(itemInput)))
    return (
        <div className="item-serach__section">
            <h3>{itemType}</h3>
            <div className="item-serach__items">
                {filterdItems.length > 0 ?
                    filterdItems.map(({ name, id, picture }) => (
                        <div key={nanoid()} className="item-search__item" onClick={onClickFunc} id={id}>
                            <img className="item-search__image" src={picture} alt="serach-picture" />
                            <div>{name}</div>
                        </div>
                    ))
                    : "No " + itemType + " match the search"
                }
            </div>
        </div>
    )
}
