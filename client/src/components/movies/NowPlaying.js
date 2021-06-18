import React from 'react'
import MovieItem from './MovieItem'

export default function NowPlaying() {
    return (
        <div className="now-playing">
            <h3>Now Playing</h3>
            <div className="item__container">
                <MovieItem />
                <MovieItem />
                <MovieItem />
                <MovieItem />
                <MovieItem />
                <MovieItem />
            </div>
        </div>
    )
}
