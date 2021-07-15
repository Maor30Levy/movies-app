import React, { useContext } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { getTheaters } from '../../../../server/utils'
import AdjustItems from '../AdjustItems';
export default function AddMovieTimeSlots({ id }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData } = useContext(DataContext);

    const onSubmitAdd = (theaters) => {
        modalDataDispatch(goForwardAction({
            elementName: "AddTimeSlots",
            props: {
                id,
                theaters
            }
        }))

    }
    return (
        <div>
            <h3>Pick a theater:</h3>
            <AdjustItems
                itemType={"Theaters"}
                getItems={getTheaters}
                getItemsParams={contentData.theatersData}
                onSubmitFunc={onSubmitAdd}
                adjustType={"Add"}
            />
        </div>
    )
}
