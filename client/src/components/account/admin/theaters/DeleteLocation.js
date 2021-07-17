import React, { useContext } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteLocation, getData } from '../../../../server/utils';
import PickLocation from './PickLocation';
export default function DeleteLocation() {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentDataDispatch } = useContext(DataContext);
    const { userData } = useContext(UserContext);

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

    const onClickSubmit = async (location) => {
        try {
            await deleteLocation(userData.token, location);
            const locationsData = await getData('locations');
            const theatersData = await getData('theaters');
            const availabilityData = await getData('timeslots');
            contentDataDispatch(setDataAction({ locationsData, theatersData, availabilityData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Location deleted!" }
            }));


        } catch (err) {
            console.log(err.response?.data.message || err.message)
        }
    };

    return (
        <PickLocation
            clickLoactionFunc={onClickLocation}
        />
    )
}
