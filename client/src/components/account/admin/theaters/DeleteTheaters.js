import React, { useContext } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { deleteTheaters, getTheaterByID, getTheatersByLocation } from '../../../../server/utils';
import AdjustItems from '../AdjustItems'
export default function DeleteTheaters({ location }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickDelete = (items) => {
        const theatersNames = items.map((item) => {
            const { name } = getTheaterByID(item);
            return `${name} - ${location}`;
        })
        modalDataDispatch(goForwardAction({
            elementName: "ConfirmDelete",
            props: {
                onDeleteFunc: onClickSubmit,
                items: theatersNames,
                onDeleteFuncData: items
            }
        }))
    };

    const onClickSubmit = (theaters) => {
        deleteTheaters(theaters)
    };
    return (
        <AdjustItems
            itemType={"Theaters"}
            getItems={getTheatersByLocation}
            getItemsParams={location}
            onSubmitFunc={onClickDelete}
            adjustType={"Delete"}
        />
    )
}
