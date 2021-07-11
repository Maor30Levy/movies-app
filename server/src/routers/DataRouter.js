const express = require('express');
const router = new express.Router();
const axios = require('axios');
const { keys } = require('../keys/keys');
const { authPort, authHost } = keys;
const dataURL = `${authHost}:${authPort}`;
router.post('/', async (req, res) => {
    try {
        return res.send();

    } catch (err) {
        return res.status(500).send();
    }
});

router.post('/data/admin/get-all', async (req, res) => {
    try {
        const result = await axios.get(`${dataURL}/admin/get-all`);
        return res.send(result.data);

    } catch (err) {
        return res.status(500).send();
    }
});


module.exports = router;