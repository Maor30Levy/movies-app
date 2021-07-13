const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Location = require('../db/models/locationsModel');
const Theater = require('../db/models/theatersModel');

router.get('/theaters/get-locations', async (req, res) => {
    try {
        const locations = await Locations.find({});
        const result = locations.map(({ name }) => (name));
        return res.send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send()
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
        console.log(req.body.theater)
        const theater = new Theater(req.body.theater);
        await theater.save();
        console.log("Location " + theater.name + " added")
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
});

module.exports = router;