const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Location = require('../db/models/locationsModel');
const Theater = require('../db/models/theatersModel');
const TimeSlot = require('../db/models/timeslotsModel');

router.get('/theaters/get-locations', async (req, res) => {
    try {
        const locations = await Location.find({});
        const result = locations.map(({ name }) => (name));
        return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.post('/theaters/add-location', auth, async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        console.log("Location " + location.name + " added")
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});


router.post('/theaters/add-theater', auth, async (req, res) => {
    try {
        const theater = new Theater(req.body.theater);
        await theater.save();
        console.log("Location " + theater.name + " added")
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.post('/theaters/update-theater', auth, async (req, res) => {
    try {
        const { theaterID, oldMoviesList, theaterDetails, allMovies, newTimeSlots } = req.body;
        const theater = await Theater.findOne({ _id: theaterID });
        const updates = Object.keys(theaterDetails);
        updates.forEach((update) => theater[update] = theaterDetails[update]);

        allMovies.forEach(async (movie) => {
            let type;
            if (theaterDetails.movies.includes(movie) && oldMoviesList.includes(movie))
                type = "Update";
            else if (theaterDetails.movies.includes(movie)) type = "Add";
            else type = "Remove";
            const slots = type !== "Remove" ? newTimeSlots.filter(({ movieID }) => (movieID === movie))[0].slots : [];
            switch (type) {
                case "Add":
                    theater.movies = [].concat(theater.movies, movie);
                    const timeslot = new TimeSlot({
                        hasOpenSeats: true,
                        theater: theaterID,
                        slots,
                        owner: movie,
                        name: "timeSlot" + movie + theaterID
                    })
                    await timeslot.save();
                    console.log("Time slot added");
                    break;
                case "Remove":
                    theater.movies = theater.movies.filter((movieID) => (movieID !== movie));
                    await TimeSlot.findOneAndDelete({ $and: [{ owner: movie }, { theater: theaterID }] })
                    console.log("Time slot removed");
                    break;
                case "Update":
                    const timeSlot = await TimeSlot.findOne({ $and: [{ owner: movie }, { theater: theaterID }] });
                    timeSlot.slots = slots;
                    timeSlot.hasOpenSeats = true;
                    await timeSlot.save();
                    console.log("Time slot updated");
                    break;

            }

        });
        await theater.save();
        console.log("Theater updated");
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

router.get('/theaters/get-theaters', async (req, res) => {
    try {
        const theaters = await Theater.find({});
        return res.send(theaters)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});


module.exports = router;