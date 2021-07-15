import React, { useContext } from 'react';
import { goForwardAction } from '../../../../actions/ModalActions';
import { DataContext } from '../../../../contexts/DataContext';
import { ModalContext } from '../../../../contexts/ModalContext';
import { getMovies } from '../../../../server/utils';
import AdjustItems from '../AdjustItems';

export default function UpdateMovie() {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData } = useContext(DataContext);

    const onClickSubmit = (id) => {
        modalDataDispatch(goForwardAction({
            elementName: "UpdateMovieStats",
            props: { id }
        }))
    };



    return (
        <div>
            <h3>Pick a movie:</h3>
            <AdjustItems
                itemType={"Movies"}
                getItems={getMovies}
                getItemsParams={contentData.moviesData}
                onSubmitFunc={onClickSubmit}
                adjustType={"Update"}
            />
        </div>
    )
}
