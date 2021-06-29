import React, { useState } from 'react'

export default function StarRating({ rating, setRating }) {
    const [active, setActive] = useState(["", "", "", "", ""]);
    const setChosenStar = (maxIndex) => {
        const result = ["", "", "", "", ""];
        for (let i = 0; i < maxIndex; i++)result[i] = 'active';
        setActive(result);
    };

    const onClickStar = (event) => {
        const id = parseInt(event.target.id);
        setChosenStar(id)
        setRating(id);
    };

    const clearRating = () => {
        setActive(["", "", "", "", ""]);
        setRating(null);
    }
    return (
        <div className="add-comment__rating">
            <div class="star-wrapper">
                <div onClick={onClickStar} className={"fas fa-star s5 " + active[4]} id="5" />
                <div onClick={onClickStar} className={"fas fa-star s4 " + active[3]} id="4" />
                <div onClick={onClickStar} className={"fas fa-star s3 " + active[2]} id="3" />
                <div onClick={onClickStar} className={"fas fa-star s2 " + active[1]} id="2" />
                <div onClick={onClickStar} className={"fas fa-star s1 " + active[0]} id="1" />
            </div>
            {rating && <button onClick={clearRating}>Clear</button>}
        </div>

    )
}
