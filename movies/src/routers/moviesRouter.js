const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Movie = require('../db/models/moviesModel');
const TimeSlot = require('../db/models/timeslotsModel');
const Theater = require('../db/models/theatersModel');

router.get('/movies/get-movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        return res.send(movies);
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.post('/movies/add-movie', auth, async (req, res) => {
    try {
        const movie = new Movie(req.body.movie);
        await movie.save();
        console.log("Movie added");
        return res.send({ id: movie.id });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.post('/movies/delete-movies', auth, async (req, res) => {
    try {
        const movies = await Movie.find({ _id: { $in: req.body.movies } });
        movies.forEach(async (movie) => {
            const theaters = await Theater.find({ movies: movie.id })
            theaters.forEach(async (theater) => {
                theater.movies = theater.movies.filter((movieID) => (movieID !== movie.id));
                await theater.save();
            })
            await movie.remove()

        });
        console.log("Movies deleted")
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.post('/movies/add-movie-timeslot', auth, async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.body.id });
        if (!movie) {
            return res.status(400).send({ message: "Failed to add timeslot, Invalid movie" })
        }
        const timeSlot = req.body.timeSlot.timeSlot;
        timeSlot.forEach(async (slot) => {
            const newTimeslot = new TimeSlot(
                {
                    ...slot,
                    owner: movie._id,
                    name: "timeSlot" + movie.id + slot.theater
                }
            )
            await newTimeslot.save();
        })


        const theaters = timeSlot.map(({ theater }) => (theater));
        theaters.forEach(async (id) => {
            const theater = await Theater.findOne({ _id: id });
            theater.movies = [].concat(theater.movies, movie.id);
            await theater.save();
        })
        console.log("Movie's Time slot added");
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.patch('/movies/add-comment', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body.comment;
        const { id } = req.body;
        const movie = await Movie.findOne({ _id: id });
        if (rating) {
            console.log(rating / 5);
            const ScoreSum = ((movie.ratings.audience) * movie.ratings.numOfRatings) + (rating / 5);
            console.log("ScoreSum:" + ScoreSum);
            movie.ratings.numOfRatings = movie.ratings.numOfRatings + 1;
            const newRating = ScoreSum / (movie.ratings.numOfRatings);
            movie.ratings.audience = newRating;
            console.log("Rating added")
        }
        if (comment) movie.comments = [].concat(movie.comments, comment);
        console.log("Comment added")
        await movie.save();
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.patch('/movies/add-seat', auth, async (req, res) => {
    try {
        const { orderDetails } = req.body;
        const { cell, day, hourIndex, movieID, theaterID } = orderDetails
        const timeSlot = await TimeSlot.findOne({ $and: [{ owner: movieID }, { theater: theaterID }] });
        if (timeSlot) {
            const slots = timeSlot.slots;
            const indexOfDay = (element) => (Object.keys(element)[0] === day);

            const index = slots.findIndex(indexOfDay)
            slots[index][day][hourIndex].seats[cell] = false;
            timeSlot.slots = slots;
            await timeSlot.markModified('slots');
            await timeSlot.save();
        }
        console.log('Seat reserved!')
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});


router.get('/movies/get-timeslots', async (req, res) => {
    try {
        const timeslots = await TimeSlot.find({});
        return res.send(timeslots);
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});





module.exports = router;