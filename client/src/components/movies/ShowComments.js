import React, { useState } from 'react'

export default function ShowComments({ comments }) {
    const [showMore, setShowMore] = useState(false);
    const [moreClass, setMoreClass] = useState("comments");
    const onClickShow = () => {
        setShowMore(!showMore);
        setMoreClass("comments" + (!showMore ? " more" : ""))
    }
    return (
        <div className="comments__container">
            <h3>Comments</h3>
            <div className={moreClass}>
                {comments.map((comment, i) => (
                    <div key={i} className="comment">{comment.comment}</div>
                ))}
            </div>
            <div>
                <button onClick={onClickShow}>
                    {showMore ? "Show Less Comments" : "Show More Comments"}
                </button>
            </div>
        </div>
    )
}
