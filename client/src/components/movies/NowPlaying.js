import React, { useContext } from 'react'
import MovieItem from './MovieItem'
import { UserContext } from '../../contexts/UserContext';
import ScrollRight from '../main/ScrollRight';
import ScrollLeft from '../main/ScrollLeft';

export default function NowPlaying() {
    const { userData } = useContext(UserContext);
    const scrollBy = (userData.windowWidth) * 24 / 100;

    return (
        <div className="now-playing">
            <h3>Now Playing</h3>
            <div className="container__box">
                <ScrollLeft scrollBy={scrollBy} />
                <div className="item__container">
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />

                </div>
                <ScrollRight scrollBy={scrollBy} />
            </div>
        </div>
    )
}
