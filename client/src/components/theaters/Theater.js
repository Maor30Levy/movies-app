import React from 'react';
import { moviesData } from '../../data/movies';
import { availabilityData } from '../../data/availabilty';
import MovieInTheater from './MovieInTheater';

export default function Theater({ id, name, movies }) {
    const getMovieSpecs = (movieID) => {
        return (moviesData.filter(({ id }) => (id === movieID)))[0];
    };


    const getMovieAvailability = (movieID, theaterID) => {
        const movie = (availabilityData.filter(({ id }) => (id === movieID)))[0];
        const availableSlots = movie.timeSlot.filter(({ theater, hasOpenSeats }) => (theater === theaterID && hasOpenSeats))
        const result = availableSlots.map((slot) => (slot.slots))
        return result;
    };

    const getMovies = (movies) => {
        const result = [];
        for (let movieID of movies) {
            const movie = { id: movieID };
            const { name, } = getMovieSpecs(movieID); //ratings
            movie.name = name;
            movie.slots = getMovieAvailability(movieID, id)

            result.push(movie);
        }
        return result;
    };
    const moviesToDisplay = getMovies(movies);
    return (
        <div className="theater" >
            <h3>{name}</h3>
            <div className="theater__movies__container">
                {moviesToDisplay.length > 0 && moviesToDisplay.map(
                    (movie, i) =>
                    (<MovieInTheater
                        key={i}
                        name={movie.name}
                        slots={movie.slots}
                        id={id}
                    />)
                )
                }
            </div>

        </div>
    )
}
