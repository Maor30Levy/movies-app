const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/theaters/get-locations', async (req, res) => {
    try {
        const locations = await Locations.find({});
        return res.send(locations)
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});

module.exports = router;