import React, { useContext } from 'react';
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import PickLocation from './PickLocation';

export default function DeleteTheater() {
    const { modalDataDispatch } = useContext(ModalContext);
    const onClickLocation = (location) => {
        modalDataDispatch(goForwardAction({
            elementName: "DeleteTheaters",
            props: { location }
        }));
    };

    return (
        <PickLocation
            clickLoactionFunc={onClickLocation}
        />
    )
}
