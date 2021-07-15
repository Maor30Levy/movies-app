import React, { useContext } from 'react'
import MovieItem from './MovieItem'
import { UserContext } from '../../contexts/UserContext';
import ScrollRight from '../main/ScrollRight';
import ScrollLeft from '../main/ScrollLeft';
import { nanoid } from 'nanoid';
import { DataContext } from '../../contexts/DataContext';

export default function MoviesSection({ section, getMoviesFunc }) {
    const { userData } = useContext(UserContext);
    const { contentData } = useContext(DataContext);
    const scrollBy = (userData.windowWidth) * 24 / 100;
    const displayMovies = getMoviesFunc(contentData.moviesData, contentData.availabilityData);
    return (
        <div className="now-playing">
            <h3>{section}</h3>
            <div className="container__box">
                <ScrollLeft scrollBy={scrollBy} />
                <div className="item__container">

                    {displayMovies.length > 0 ? displayMovies.map(({ id, description, name, ratings, comments, picture }, i) => (

                        <MovieItem key={nanoid()}
                            id={id}
                            description={description}
                            name={name}
                            ratings={ratings}
                            comments={comments}
                            picture={picture}

                        />
                    )) :
                        "No Available Movies "}


                </div>
                <ScrollRight scrollBy={scrollBy} />
            </div>
        </div>
    )
}
