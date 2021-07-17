import React, { useContext } from 'react'
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteTheaters, getData, getTheaterByID, getTheatersByLocation } from '../../../../server/utils';
import AdjustItems from '../AdjustItems'
export default function DeleteTheaters({ location }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const { userData } = useContext(UserContext);
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

    const onClickSubmit = async (theaters) => {
        try {
            await deleteTheaters(userData.token, theaters)
            const theatersData = await getData('theaters');
            const availabilityData = await getData('timeslots');
            contentDataDispatch(setDataAction({ theatersData, availabilityData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Theaters deleted!" }
            }));


        } catch (err) {
            console.log(err.response?.data.message || err.message)
        }

    };
    return (
        <AdjustItems
            itemType={"Theaters"}
            getItems={getTheatersByLocation}
            getItemsParams={{ location, theaters: contentData.theatersData }}
            onSubmitFunc={onClickDelete}
            adjustType={"Delete"}
        />
    )
}
