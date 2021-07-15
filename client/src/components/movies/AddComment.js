import React, { useContext, useState } from 'react';
import StarRating from './StarRating';
import { nanoid } from 'nanoid';
import { UserContext } from '../../contexts/UserContext';
import { ModalContext } from '../../contexts/ModalContext';
import { clearModalAction, goForwardAction } from '../../actions/ModalActions';
import { addComment, getData } from '../../server/utils';
import { DataContext } from '../../contexts/DataContext';
import { setDataAction } from '../../actions/DataActions';


export default function AddComment({ id }) {
    const { userData } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const { contentDataDispatch } = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);
    const onInputComment = (event) => {
        setErrorMessage("")
        const input = event.target.value
        if (input === '') setComment(null);
        else setComment(input);
    };
    const onClickSubmit = async () => {
        setErrorMessage("")
        const request = {};
        if (rating) request.rating = rating;
        if (comment) request.comment = {
            user: userData.activeUser,
            comment,
            id: nanoid()
        };
        try {
            await addComment(userData.token, request, id);
            const moviesData = await getData('movies');
            contentDataDispatch(setDataAction({ moviesData }));
            modalDataDispatch(clearModalAction());
            modalDataDispatch(goForwardAction({
                elementName: "ApprovalMessage",
                props: { message: "Comment added!" }
            }));
        } catch (err) {
            setErrorMessage(err.response?.data.message || err.message)
        }

    }
    return (
        <div className="add-comment__container">
            <StarRating setRating={setRating} rating={rating} />
            <div className="add-comment__comment">
                <textarea onInput={onInputComment}></textarea>
            </div>
            <button
                disabled={!comment && !rating}
                onClick={onClickSubmit}
            >Submit</button>
            {!!errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}
