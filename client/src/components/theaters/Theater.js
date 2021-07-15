import React, { useContext } from 'react';
import MovieInTheater from './MovieInTheater';
import { getMovieAvailability } from '../../server/utils';
import { nanoid } from 'nanoid';
import ScrollRight from '../main/ScrollRight';
import ScrollLeft from '../main/ScrollLeft';
import { DataContext } from '../../contexts/DataContext';
import { UserContext } from '../../contexts/UserContext';

export default function Theater({ id, name, movies }) {
    const { contentData } = useContext(DataContext);
    const { userData } = useContext(UserContext);

    const scrollBy = (userData.windowWidth) * 24 / 100;

    const getMovieSpecs = (movieID) => {
        return (contentData.moviesData.filter(({ id }) => (id === movieID)))[0];
    };




    const getMovies = (movies) => {
        const result = [];
        for (let movieID of movies) {
            const movie = { id: movieID };
            const movieSpecs = getMovieSpecs(movieID);
            if (movieSpecs) {
                const { name, picture, description } = movieSpecs; //ratings
                movie.name = name;
                movie.picture = picture;
                movie.description = description;
                movie.slots = getMovieAvailability(movieID, id, contentData.availabilityData)
                result.push(movie);
            }

        }
        return result;
    };
    const moviesToDisplay = getMovies(movies);
    return (
        <div className="theater" >
            <h3>{name}</h3>
            <div className="container__box">
                <ScrollLeft scrollBy={scrollBy} />
                <div className="theater__movies__container">

                    {moviesToDisplay.length > 0 && moviesToDisplay.map(
                        (movie, i) =>
                        (<MovieInTheater
                            key={nanoid()}
                            name={movie.name}
                            picture={movie.picture}
                            description={movie.description}
                            slots={movie.slots}
                            id={id}
                            movieID={movie.id}
                        />)
                    )
                    }
                </div>
                <ScrollRight scrollBy={scrollBy} />
            </div>
        </div>
    )
}
