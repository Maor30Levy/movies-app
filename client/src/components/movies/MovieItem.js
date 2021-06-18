import React from 'react'

export default function MovieItem() {
    return (
        <div className="item">
            <div className="poster"></div>
            <div className="movie-ratings__container">
                <div className="movie-ratings__audience">
                    <div className="movie-ratings__icon"></div>
                    <div className="movie-ratings__legend"></div>
                </div>
                <div className="movie-ratings__critics">
                    <div className="movie-ratings__icon"></div>
                    <div className="movie-ratings__legend"></div>
                </div>
            </div>
            <div className="movie-name">Name movie Roadrunner: A Film About Anthony Bourdain</div>
        </div>
    )
}
