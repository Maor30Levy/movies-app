import React from 'react'
import MoviesSection from './MoviesSection';
import { getAvailableMovies } from '../../server/utils';


export default function NowPlaying() {
    return (
        <MoviesSection
            section={"Now Playing"}
            getMoviesFunc={getAvailableMovies}
        />
    )
}
