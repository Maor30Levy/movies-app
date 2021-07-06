import { moviesData } from '../data/movies';
import { availabilityData } from '../data/availability';
import { theaters } from '../data/theaters';
import { locations } from '../data/locations';

export const getElementFromArray = (array, key, value) => {
    try {
        return array.filter((element) => (element[key] === value))[0];
    } catch (err) {
        return
    }

}
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
    return theaters.filter(({ id }) => (theaterID === id))[0];

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


export const getMovieAvailabilityAll = (movieID) => {
    const result = [];
    const availableTheaters = theaters.filter(({ movies }) => (movies.includes(movieID)));
    for (let theater of availableTheaters) result.push({ theater: theater.name, location: theater.location, slots: getMovieAvailability(movieID, theater.id) });
    return result;
}