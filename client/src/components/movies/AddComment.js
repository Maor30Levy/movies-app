import React, { useState } from 'react';
import StarRating from './StarRating';
export default function AddComment() {
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);
    const onInputComment = (event) => {
        const input = event.target.value
        if (input === '') setComment(null);
        else setComment(input);
    };
    const onClickSubmit = () => {
        const request = {};
        if (rating) request.rating = rating;
        if (comment) request.comment = {
            comment
        };
        console.log(request)
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
        </div>
    )
}
