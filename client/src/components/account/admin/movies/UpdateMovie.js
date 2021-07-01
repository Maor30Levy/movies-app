import React, { useContext, useState } from 'react';
import { ModalContext } from '../../../../contexts/ModalContext';
import { getMovies } from '../../../../server/utils';
import UpdateItem from '../UpdateItem';

export default function UpdateMovie() {
    const { modalDataDispatch } = useContext(ModalContext);
    const [isChecked, setIsChecked] = useState({});


    const onClickSubmit = () => {
        console.log('submit');
    }

    return (
        <UpdateItem
            itemType={"Movies"}
            getItems={getMovies}
            onSubmit={onClickSubmit}
            getItemsParams={undefined}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
        />
    )
}
