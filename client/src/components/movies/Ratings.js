import React from 'react'

export default function Ratings({ criticsRatings, audienceRatings }) {

    const getTomatoIcon = (rating) => {
        if (rating >= 0.9) return 'med-tomato';
        if (rating >= 0.6) return 'good-tomato';
        else return 'rotten-tomato';
    };



    return (
        <div className="movie-ratings__container">
            <div className="movie-ratings__critics">
                <div className="movie-ratings__icon">
                    <img src={"./icons/ratings/" + getTomatoIcon(criticsRatings) + ".png"} alt="audience-icon" />
                </div>
                <div className="movie-ratings__legend">{Math.round(criticsRatings * 100)}%</div>
            </div>
            <div className="movie-ratings__audience">
                <div className="movie-ratings__icon">
                    <img src={"./icons/ratings/" + (audienceRatings > 0.5 ? "good" : "bad") + "-popcorn.png"} alt="audience-icon" />
                </div>
                <div className="movie-ratings__legend">{Math.round(audienceRatings * 100)}%</div>
            </div>

        </div>
    )
}
