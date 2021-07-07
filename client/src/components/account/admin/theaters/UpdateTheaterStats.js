import React, { useContext, useState } from 'react'
import { goForwardAction } from '../../../../actions/ModalActions';
import { ModalContext } from '../../../../contexts/ModalContext';
import { getMovieByID, getMovies, getTheaterByID } from '../../../../server/utils';
import { nanoid } from 'nanoid';

export default function UpdateTheaterStats({ id }) {
    const { modalDataDispatch } = useContext(ModalContext);

    const { name, movies, seats } = getTheaterByID(id);
    const [nameValue, setNameValue] = useState(name);
    const [seatsValue, setSeatsValue] = useState(seats);
    const [moviesList, setMoviesList] = useState(movies);
    const setValues = [setNameValue, setSeatsValue];
    const [addMoreMovies, setAddMoreMovies] = useState(false);
    const allMovies = getMovies();
    const [displyMovies, setDisplayMovies] = useState([...allMovies])

    const filterItems = (event) => {
        const value = event.target.value;
        if (value === '') {
            setDisplayMovies(allMovies);

        } else {
            const filter = allMovies.filter((item) => (item.name.toLowerCase().includes(value.toLowerCase())));
            setDisplayMovies(filter);
        }

    };

    const onClickRemove = (event) => {
        const index = event.target.parentElement.id;
        const newMovieList = [...moviesList];
        newMovieList.splice(index, 1);
        setMoviesList(newMovieList);
        setAddMoreMovies(addMoreMovies || newMovieList.length === 0)

    };

    const onChangeMovieChecked = (event) => {
        const index = moviesList.indexOf(event.target.id);
        const newMovieList = [...moviesList];
        if (index >= 0) {
            newMovieList.splice(index, 1);
            setMoviesList(newMovieList);
        } else {

            newMovieList.push(event.target.id)
            setMoviesList(newMovieList);
        }
    }
    const onChangeValue = (event) => {
        const index = event.target.id;
        const value = event.target.value;
        setValues[index](value);
    };

    const onClickAddMovies = () => {
        setAddMoreMovies(!addMoreMovies);
    };

    const onClickUpdate = () => {
        const theaterDetails = {
            name: nameValue,
            seats: parseInt(seatsValue),
            movies: moviesList
        };
        modalDataDispatch(goForwardAction({
            elementName: "UpdateAvailableTimeSlots",
            props: {
                oldMoviesList: movies,
                theaterDetails,
                id
            }
        }))
    }

    return (
        <div>
            <div>Theater Name: <input id="0" value={nameValue} onChange={onChangeValue} /></div>
            <div>Seats: <input id="1" value={seatsValue} type="number" onChange={onChangeValue} /></div>
            <div className="movies-in-theater">
                {moviesList.map((movieID, i) => {
                    const { name } = getMovieByID(movieID);
                    return (<div className="listed-movie" key={nanoid()} id={i} onClick={onClickRemove}>
                        <div className="remove">Remove</div>{name}
                    </div>)
                })}
                <div>
                    <button className="add-more-movies" onClick={onClickAddMovies}>{"Show " + (!addMoreMovies ? "More" : "Less") + " Movies"}</button>
                    {addMoreMovies && <div className="more-movies-container">
                        <div className="query">
                            <input placeholder={"Find Movies"} onInput={filterItems} />
                        </div>
                        {
                            displyMovies.map((movie, i) => (
                                <div key={nanoid()}>
                                    <input id={movie.id} type="checkBox" checked={moviesList.indexOf(movie.id) >= 0} onChange={onChangeMovieChecked} />{movie.name}
                                </div>

                            ))
                        }
                    </div>}
                </div>
            </div>
            <div>
                <button onClick={onClickUpdate} disabled={moviesList.length === 0}>Update Available Time Slots</button>
            </div>
        </div>
    )
}
