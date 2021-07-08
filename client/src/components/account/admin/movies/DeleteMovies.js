import React, { useContext } from 'react';
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { deleteMovies, getMovieByID, getMovies } from '../../../../server/utils'
import AdjustItems from '../AdjustItems';

export default function DeleteMovies() {
    const { modalDataDispatch } = useContext(ModalContext);

    const onClickDelete = (items) => {
        const moviesNames = items.map((item) => {
            const { name } = getMovieByID(item);
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

    const onClickSubmit = (movies) => {
        deleteMovies(movies);
    };

    return (
        <div>
            <h3>Pick a movie:</h3>
            <AdjustItems
                itemType={"Movies"}
                getItems={getMovies}
                getItemsParams={undefined}
                onSubmitFunc={onClickDelete}
                adjustType={"Delete"}
            />
        </div>
    )
}
