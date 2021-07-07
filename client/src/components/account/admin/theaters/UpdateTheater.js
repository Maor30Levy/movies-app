import React, { useContext } from 'react'
import { getTheatersByLocation } from '../../../../server/utils';
import { ModalContext } from '../../../../contexts/ModalContext';
import { goForwardAction } from '../../../../actions/ModalActions';
import PickLocation from './PickLocation';
export default function UpdateTheater() {
    const { modalDataDispatch } = useContext(ModalContext);
    const onClickSubmit = () => {

    }
    const onClickLocation = (location) => {
        modalDataDispatch(goForwardAction({
            elementName: "UpdateItem",
            props: {
                itemType: "Theaters",
                getItems: getTheatersByLocation,
                onSubmit: onClickSubmit,
                getItemsParams: location,
                elementName: "UpdateTheaterStats"
            }
        }))
    };

    return (
        <PickLocation
            clickLoactionFunc={onClickLocation}
        />
    )
}
