import React from 'react'
import MoviesSection from './MoviesSection';
import { getUnavailableMovies } from '../../server/utils';


export default function ComingSoon() {
    return (
        <MoviesSection
            section={"Coming Soon"}
            getMoviesFunc={getUnavailableMovies}
        />
    )
}
