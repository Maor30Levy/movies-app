import React, { useContext } from 'react'
import { goForwardAction } from '../../actions/ModalActions';
import { ModalContext } from '../../contexts/ModalContext';
import { getMovieAvailabilityAll } from '../../server/utils';
import ShowComments from './ShowComments';
import { nanoid } from 'nanoid';
import { DataContext } from '../../contexts/DataContext';
import Trailer from './Trailer';
export default function Movie({ description, comments, id, trailer }) {
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentData } = useContext(DataContext);

    const allSlots = getMovieAvailabilityAll(id, contentData.theatersData, contentData.availabilityData);

    const onClickTheater = (event) => {
        const { name, slots } = allSlots[event.target.id];
        const theaterID = event.target.parentElement.id;
        modalDataDispatch(goForwardAction({
            elementName: "ShowMovieDetails",
            props: { name, slots, movieID: id, theaterID }
        }));
    }
    return (
        <div className="movie__container">
            {trailer && <Trailer trailer={trailer} />}
            <div className="description__container">
                {description}
            </div>
            <div className="theater-options">
                {allSlots.map(({ theater, location, theaterID }, i) => (
                    <div key={nanoid()} id={theaterID}>
                        <div className="modal__option" onClick={onClickTheater} id={i}>
                            {`${theater}, ${location}`}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {comments.length > 0 ?
                    <ShowComments comments={comments} /> :
                    <h3>No comments</h3>
                }
            </div>
        </div>
    )
}
