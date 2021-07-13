import { moviesData } from '../data/movies';
import { availabilityData } from '../data/availability';
import { theaters } from '../data/theaters';
import { locations } from '../data/locations';
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

export const addMovie = (movie) => {
    console.log(movie);
};

export const updateMovie = (movieID, fieldsToUpdate) => {
    console.log(movieID, fieldsToUpdate);
};

export const deleteMovies = (movies) => {
    console.log(movies);
};

export const getMovieAvailability = (movieID, theaterID) => {
    const movie = (availabilityData.filter(({ id }) => (id === movieID)))[0];
    const availableSlots = movie.timeSlot.filter(({ theater, hasOpenSeats }) => (theater === theaterID && hasOpenSeats))
    const result = availableSlots.map((slot) => (slot.slots))
    return result;
};

export const getMovies = () => {
    return moviesData;
};

export const getMovieByName = (movieName) => {
    return getMovies().filter(({ name }) => (movieName === name))[0];
};

export const getMovieByID = (movieID) => {
    return getMovies().filter(({ id }) => (movieID === id))[0];
};

export const getAvailableMovies = (moviesData) => {
    const result = [];
    moviesData.forEach((movie) => {
        for (let timeSlot of availabilityData) {
            if (movie.id === timeSlot.id) {
                result.push(movie);
                break;
            }
        }
    });
    return result;
};

export const getMovieAvailabilityAll = (movieID) => {
    const result = [];
    const availableTheaters = theaters.filter(({ movies }) => (movies.includes(movieID)));
    for (let theater of availableTheaters) result.push({ theater: theater.name, location: theater.location, slots: getMovieAvailability(movieID, theater.id) });
    return result;
};


export const addAvailability = (availability) => {
    console.log(availability)
}



export const addNewTheater = (theater) => {
    console.log(theater);
};

export const deleteTheaters = (theaters) => {
    console.log(theaters);
};

export const getTheaterByID = (theaterID) => {
    try {
        const { name, movies, seats, location } = theaters.filter(({ id }) => (theaterID === id))[0];
        return { name, movies, seats, location }
    } catch (err) {
        return { name: "", movies: [], seats: 0, location: "" }
    }
};

export const checkForExistingTheater = (theaterName, theaterLocation) => {
    return theaters.filter(({ name, location }) => (
        name === theaterName && location === theaterLocation
    )).length > 0
};

export const getTheatersByLocation = (location) => {
    return theaters.filter((theater) => (location === theater.location));
};

export const getTheaters = () => {
    return theaters.map(({ name, id, location }) => ({ name: `${name} - ${location}`, id }));
}

export const getAllTheaterTimeSlots = (theaterID, movies) => {
    const result = [];
    movies.forEach((movie) => {
        const arrResult = getElementFromArray(availabilityData, "id", movie) || { timeSlot: {} };
        result.push({ movieID: movie, slots: getElementFromArray(arrResult.timeSlot, "theater", theaterID) || { theater: theaterID, slots: [] } })
    })
    return result;
};

export const getLocations = () => {
    return locations;
};

export const addNewLocation = (location) => {
    console.log(location);
};

export const deleteLocation = (location) => {
    console.log(location);
    const locationTheaters = getTheatersByLocation(location).map(({ id }) => (id)) || [];
    console.log(locationTheaters);
};

export const checkForExistingLocation = (location) => {
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
        data.newsData = await getArticles();
        data.moviesData = moviesData;
        data.availabilityData = availabilityData;
        data.theatersData = theaters;
        data.locationsData = locations;
        return data;
    } catch (err) {
        console.log(err)
    }

};

export const getArticles = async () => {
    try {
        const { data } = await axios.get(`${serverURL}/data/get-articles`);
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