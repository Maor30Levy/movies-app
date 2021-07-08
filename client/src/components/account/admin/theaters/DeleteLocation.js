import React, { useContext } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { deleteLocation } from '../../../../server/utils';
import PickLocation from './PickLocation';
export default function DeleteLocation() {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickLocation = (location) => {
        modalDataDispatch(goForwardAction({
            elementName: "ConfirmDelete",
            props: {
                onDeleteFunc: onClickSubmit,
                items: [location],
                onDeleteFuncData: location
            }
        }))
    };

    const onClickSubmit = (location) => {
        deleteLocation(location)
    };

    return (
        <PickLocation
            clickLoactionFunc={onClickLocation}
        />
    )
}
