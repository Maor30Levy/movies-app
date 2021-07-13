const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Movie = require('../db/models/moviesModel');
const TimeSlot = require('../db/models/timeslotsModel');

router.get('/movies/get-movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        console.log(movies)
        return res.send(movies);
    } catch (err) {
        console.log(err)
        return res.status(500).send()
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
        return res.status(500).send()
    }
});

router.post('/movies/add-movie-timeslot', auth, async (req, res) => {
    try {
        const timeslot = new TimeSlot(req.body.movie);
        await timeslot.save();
        console.log("Movie's Time slot added");
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});





module.exports = router;