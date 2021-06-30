import { moviesData } from '../data/movies';
import { availabilityData } from '../data/availability';
import { theaters } from '../data/theaters';


export const getMovieAvailability = (movieID, theaterID) => {
    const movie = (availabilityData.filter(({ id }) => (id === movieID)))[0];
    const availableSlots = movie.timeSlot.filter(({ theater, hasOpenSeats }) => (theater === theaterID && hasOpenSeats))
    const result = availableSlots.map((slot) => (slot.slots))
    return result;
};

export const getMovies = () => {
    return moviesData;
};

export const getTheaters = () => {
    return theaters;
};

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