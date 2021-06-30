import React from 'react'
import UpdateItem from '../UpdateItem';
import { getTheaters } from '../../../../server/utils';

export default function UpdateTheater() {

    const onClickSubmit = () => {
        console.log('submit');
    }

    return (
        <UpdateItem
            itemType={"Theaters"}
            getItems={getTheaters}
            onSubmit={onClickSubmit}
        />
    )
}
