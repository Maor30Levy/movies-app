import { serverURL } from './login';
import axios from 'axios';
export const getElementFromArray = (array, key, value) => {
    try {
        return array.filter((element) => (element[key] === value))[0];
    } catch (err) {
        return
    }

};


export const changePassword = async (token, request, isAdmin) => {
    try {
        await axios.patch(`${serverURL}/data/update-password`, { token, request, isAdmin });
    } catch (err) {
        throw err;
    }
};

export const getAdminsData = async (token) => {
    try {
        const result = await axios.get(`${serverURL}/data/admin/get-all`, { params: { token } });
        return { adminsData: result.data };
    } catch (err) {
        console.log(err.response?.statusText);
        return { adminsData: [] };
    }

}

export const deleteAdmins = async (adminsIDsArray, token) => {
    try {
        await axios.post(`${serverURL}/data/admin/delete`, { token, admins: adminsIDsArray });

    } catch (err) {
        console.log(err.response?.statusText)
    }
}




export const addMovie = async (movie, token) => {
    const { data } = await axios.post(`${serverURL}/data/add-movie/`, { movie, token });
    return data.id;
};

export const updateMovie = (movieID, fieldsToUpdate) => {
    console.log(movieID, fieldsToUpdate);
};

export const deleteMovies = async (movies, token) => {
    await axios.post(`${serverURL}/data/delete-movies/`, { movies, token });

};

export const getMovies = (moviesData) => {
    return moviesData;
};

export const getMovieByName = (movieName, moviesData) => {
    return moviesData.filter(({ name }) => (movieName === name))[0];
};

export const getMovieByID = (movieID, moviesData) => {
    return getMovies(moviesData).filter(({ id }) => (movieID === id))[0];
};

export const getAvailableMovies = (moviesData, availabilityData) => {
    const result = [];
    moviesData.forEach((movie) => {
        for (let timeSlot of availabilityData) {
            if (movie.id === timeSlot.owner) {
                result.push(movie);
                break;
            }
        }
    });
    return result;
};

export const getUnavailableMovies = (moviesData, availabilityData) => {
    const result = [];
    moviesData.forEach((movie) => {
        let found = false;
        for (let timeSlot of availabilityData) {
            if (movie.id === timeSlot.owner) found = true;
        }
        if (!found) result.push(movie);
    });
    return result;
};

export const getMovieAvailability = (movieID, theaterID, availabilityData) => {
    try {
        const availableSlots = (availabilityData.filter(({ owner, theater, hasOpenSeats }) => (owner === movieID && theater === theaterID && hasOpenSeats)));
        const result = availableSlots.map((slot) => (slot.slots))
        return result;
    } catch (err) {
        console.log(err.message)
        return []
    }

};

export const getMovieAvailabilityAll = (movieID, theaters, availabilityData) => {
    const result = [];
    const availableTheaters = theaters.filter(({ movies }) => (movies.includes(movieID)));
    for (let theater of availableTheaters) result.push({ theater: theater.name, location: theater.location, slots: getMovieAvailability(movieID, theater.id, availabilityData), theaterID: theater.id });
    return result;
};


export const addAvailability = async (id, timeSlot, token) => {
    try {
        await axios.post(`${serverURL}/data/add-movie-timeslot`, { id, timeSlot, token });

    } catch (err) {
        throw err
    }
}

export const addComment = async (token, comment, id) => {
    try {
        await axios.patch(`${serverURL}/data/add-comment`, { token, comment, id });

    } catch (err) {
        throw err
    }
}

export const reserveSeat = async (token, orderDetails) => {
    try {
        await axios.patch(`${serverURL}/data/add-seat`, { token, orderDetails });

    } catch (err) {
        throw err
    }
}

export const addNewTheater = async (token, theater) => {
    try {
        await axios.post(`${serverURL}/data/add-theater`, { token, theater });

    } catch (err) {
        throw err
    }
};

export const deleteTheaters = (theaters) => {
    console.log(theaters);
};

export const getTheaterByID = (theaterID, theaters) => {
    try {
        const { name, movies, seats, location } = theaters.filter(({ id }) => (theaterID === id))[0];
        return { name, movies, seats, location }
    } catch (err) {
        return { name: "", movies: [], seats: 0, location: "" }
    }
};

export const checkForExistingTheater = (theaterName, theaterLocation, theaters) => {
    return theaters.filter(({ name, location }) => (
        name === theaterName && location === theaterLocation
    )).length > 0
};

export const getTheatersByLocation = ({ location, theaters }) => {
    return theaters.filter((theater) => (location === theater.location));
};

export const getTheaters = (theaters) => {
    return theaters.map(({ name, id, location }) => ({ name: `${name} - ${location}`, id }));
};

export const updateTheater = async (token, theaterID, oldMoviesList, theaterDetails, newTimeSlots) => {
    try {
        const allMovies = [];
        const length = oldMoviesList.length > theaterDetails.movies.length ?
            oldMoviesList.length :
            theaterDetails.movies.length;
        for (let i = 0; i < length; i++) {
            if (!allMovies.includes(theaterDetails.movies[i])) allMovies.push(theaterDetails.movies[i]);
            if (!allMovies.includes(oldMoviesList[i])) allMovies.push(theaterDetails.movies[i]);

        }
        await axios.post(`${serverURL}/data/update-theater`, { token, theaterID, oldMoviesList, theaterDetails, allMovies, newTimeSlots });

    } catch (err) {
        throw err
    }
}

export const getAllTheaterTimeSlots = (theaterID, movies, availabilityData) => {
    const result = [];
    const filterdData = availabilityData.filter(({ theater }) => (theater === theaterID))
    movies.forEach((movie) => {
        const slots = filterdData.filter(({ owner }) => (owner === movie))[0]?.slots;
        if (slots) result.push({ movieID: movie, slots })
    })
    return result || [];
};

export const getLocations = (locations) => {
    return locations;
};

export const addNewLocation = async (token, name) => {
    try {
        await axios.post(`${serverURL}/data/add-location`, { token, name });

    } catch (err) {
        throw err
    }
};

export const deleteLocation = (location, theaters) => {
    console.log(location);
    const locationTheaters = getTheatersByLocation({ location, theaters }).map(({ id }) => (id)) || [];
    console.log(locationTheaters);
};

export const checkForExistingLocation = (location, locations) => {
    return locations.filter((l) => (
        l === location
    )).length > 0
};




export const addArticle = async (token, article) => {
    try {
        await axios.post(`${serverURL}/data/add-article`, { token, article });

    } catch (err) {
        console.log(err.message)
        throw err;
    }
};

export const updateArticle = async (id, article, token) => {
    try {
        await axios.patch(`${serverURL}/data/update-article`, { id, token, article });

    } catch (err) {
        throw err
    }
};

export const deleteArticles = async (token, articles) => {
    try {
        await axios.post(`${serverURL}/data/delete-articles`, { token, articles });

    } catch (err) {
        throw err
    }
};

export const getAllData = async () => {
    const data = {};
    try {
        data.newsData = await getData('articles');
        data.moviesData = await getData('movies');
        data.availabilityData = await getData('timeslots');
        data.theatersData = await getData('theaters');
        data.locationsData = await getData('locations');
        data.isLoaded = true;
        return data;
    } catch (err) {
        console.log(err)
    }

};

export const getData = async (section) => {
    try {
        const { data } = await axios.get(`${serverURL}/data/get-${section}`);
        return data;
    } catch (err) {
        console.log(err)
    }

};


export const getNews = (news) => {
    return news;
};

export const getArticleByid = (articleID, articles) => {
    return articles.filter(({ id }) => (id === articleID))[0];
};