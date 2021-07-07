import { moviesData } from '../data/movies';
import { availabilityData } from '../data/availability';
import { theaters } from '../data/theaters';
import { locations } from '../data/locations';
import { news } from '../data/news';

export const addArticle = (article) => {
    console.log(article);
};

export const updateArticle = (article) => {
    console.log(article);
};

export const deleteArticles = (articles) => {
    console.log(articles);
};

export const getNews = () => {
    return news;
};

export const getArticleByid = (articleID) => {
    return getNews().filter(({ id }) => (id === articleID))[0];
};

export const getElementFromArray = (array, key, value) => {
    try {
        return array.filter((element) => (element[key] === value))[0];
    } catch (err) {
        return
    }

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

export const getTheatersByLocation = (location) => {
    return theaters.filter((theater) => (location === theater.location));
};

export const getAllTheaterTimeSlots = (theaterID, movies) => {
    const result = [];
    movies.forEach((movie) => {
        const arrResult = getElementFromArray(availabilityData, "id", movie) || { timeSlot: {} };
        result.push({ movieID: movie, slots: getElementFromArray(arrResult.timeSlot, "theater", theaterID) || { theater: theaterID, slots: [] } })
    })
    return result;
}

export const getTheaterByID = (theaterID) => {
    try {
        const { name, movies, seats } = theaters.filter(({ id }) => (theaterID === id))[0];
        return { name, movies, seats }
    } catch (err) {
        return { name: "", movies: [], seats: 0 }
    }
};

export const getMovieByID = (movieID) => {
    return getMovies().filter(({ id }) => (movieID === id))[0];
};

export const getLocations = () => {
    return locations;
}
export const getAvailableMovies = () => {
    const result = [];
    getMovies().forEach((movie) => {
        for (let timeSlot of availabilityData) {
            if (movie.id === timeSlot.id) {
                result.push(movie);
                break;
            }
        }
    });
    return result;
};


export const checkForExistingTheater = (theaterName, theaterLocation) => {
    return theaters.filter(({ name, location }) => (
        name === theaterName && location === theaterLocation
    )).length > 0
};

export const getMovieAvailabilityAll = (movieID) => {
    const result = [];
    const availableTheaters = theaters.filter(({ movies }) => (movies.includes(movieID)));
    for (let theater of availableTheaters) result.push({ theater: theater.name, location: theater.location, slots: getMovieAvailability(movieID, theater.id) });
    return result;
};

export const addNewTheater = (theater) => {
    console.log(theater);
}

export const checkForExistingLocation = (location) => {
    return locations.filter((l) => (
        l === location
    )).length > 0
};

export const addNewLocation = (location) => {
    console.log(location);
}

export const deleteLocation = (location) => {
    console.log(location);
    const locationTheaters = getTheatersByLocation(location).map(({ id }) => (id)) || [];
    console.log(locationTheaters);
}

export const deleteTheaters = (theaters) => {
    console.log(theaters);
}