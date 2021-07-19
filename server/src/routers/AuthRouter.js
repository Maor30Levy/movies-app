const express = require('express');
const axios = require('axios');
const router = new express.Router();
const { keys } = require('../keys/keys');
const { authPort, authHost } = keys;
const authURL = `http://${authHost}:${authPort}`;

router.post('/server/subscribe', async (req, res) => {
    try {
        const { isAdmin, email, password, name } = req.body;
        const path = isAdmin ? "admin" : "user";
        const result = await axios.post(`${authURL}/${path}/subscribe`, { email, password, name });
        return res.status(201).send(result.data);

    } catch (err) {
        if (err.response.statusText) {
            console.log(err.response.statusText);
            return res.status(err.response.status).send({ message: err.response.statusText });
        }
        return res.status(500).send();
    }
});

router.post('/server/login', async (req, res) => {
    try {

        const { isAdmin, email, password } = req.body;
        const path = isAdmin ? "admin" : "user";
        const result = await axios.post(`${authURL}/${path}/login`, { email, password });
        return res.send(result.data);

    } catch (err) {
        if (err.response?.statusText) {
            console.log(err.response.statusText);
            return res.status(err.response.status).send({ message: err.response.statusText });
        }
        return res.status(500).send();
    }
});

router.post('/server/logout', async (req, res) => {
    try {
        const { token, isAdmin } = req.body;
        const path = isAdmin ? "admin" : "user";
        await axios.post(`${authURL}/${path}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'UserType': isAdmin ? "Admin" : "User"
            }
        });
        return res.send();

    } catch (err) {
        if (err.response?.statusText) {
            console.log(err.response.statusText);
            return res.status(err.response.status).send({ message: err.response.statusText });
        }
        return res.status(500).send();
    }
});

module.exports = router;