import React, { useContext } from 'react';
import { setDataAction } from '../../../../actions/DataActions';
import { clearModalAction, goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { UserContext } from '../../../../contexts/UserContext';
import { deleteMovies, getData, getMovieByID, getMovies } from '../../../../server/utils'
import AdjustItems from '../AdjustItems';

export default function DeleteMovies() {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData, contentDataDispatch } = useContext(DataContext);
    const { userData } = useContext(UserContext);

    const onClickDelete = (items) => {
        const moviesNames = items.map((item) => {
            const { name } = getMovieByID(item, contentData.moviesData);
            return name;
        })
        modalDataDispatch(goForwardAction({
            elementName: "ConfirmDelete",
            props: {
                onDeleteFunc: onClickSubmit,
                items: moviesNames,
                onDeleteFuncData: items
            }
        }))
    };

    const onClickSubmit = async (movies) => {
        await deleteMovies(movies, userData.token);
        const moviesData = await getData('movies');
        //const availabilityData = await getData('timeslots');
        contentDataDispatch(setDataAction({ moviesData, }));//availabilityData
        modalDataDispatch(clearModalAction());
        modalDataDispatch(goForwardAction({
            elementName: "ApprovalMessage",
            props: { message: "Movies Deleted" }
        }));
    };

    return (
        <div>
            <h3>Pick a movie:</h3>
            <AdjustItems
                itemType={"Movies"}
                getItems={getMovies}
                getItemsParams={contentData.moviesData}
                onSubmitFunc={onClickDelete}
                adjustType={"Delete"}
            />
        </div>
    )
}
