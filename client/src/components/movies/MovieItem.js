import React from 'react';
import Ratings from './Ratings';


export default function MovieItem() {
    return (
        <div className="item">
            <div className="poster__container">
                <img className="poster" src="./temp/peter-rabbit-2.jpg" alt="movie-poster" />
            </div>
            <Ratings
                criticsRatings={0.95}
                audienceRatings={0.43}
            />
            <div className="movie-name">Name movie Roadrunner: A Film About Anthony Bourdain</div>
        </div>
    )
}
