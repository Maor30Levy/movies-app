import React, { useContext, useState } from 'react'
import MovieItem from './MovieItem'
import { UserContext } from '../../contexts/UserContext';
import ScrollRight from '../main/ScrollRight';
import ScrollLeft from '../main/ScrollLeft';
import { getAvailableMovies } from '../../server/utils';
import { nanoid } from 'nanoid';


export default function NowPlaying() {
    const { userData } = useContext(UserContext);
    const scrollBy = (userData.windowWidth) * 24 / 100;
    const [displayMovies, setDisplayMovies] = useState(getAvailableMovies());
    return (
        <div className="now-playing">
            <h3>Now Playing</h3>
            <div className="container__box">
                <ScrollLeft scrollBy={scrollBy} />
                <div className="item__container">

                    {displayMovies.length > 0 ? displayMovies.map(({ id, description, name, ratings, comments }, i) => (

                        <MovieItem key={nanoid()}
                            id={id}
                            description={description}
                            name={name}
                            ratings={ratings}
                            comments={comments}

                        />
                    )) :
                        "No Available Movies "}


                </div>
                <ScrollRight scrollBy={scrollBy} />
            </div>
        </div>
    )
}
