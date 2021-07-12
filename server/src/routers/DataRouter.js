const express = require('express');
const router = new express.Router();
const axios = require('axios');
const { keys } = require('../keys/keys');
const { usersHost, usersPort } = keys;
const usersURL = `${usersHost}:${usersPort}`;


router.get('/data/admin/get-all', async (req, res) => {
    try {
        const result = await axios.get(`${usersURL}/admin/get-all`, {
            headers: {
                'Authorization': `Bearer ${req.query.token}`,
                'UserType': "Admin"
            }
        });
        return res.send(result.data);

    } catch (err) {
        if (err.response.statusText) {
            console.log(err.response.statusText);
            return res.status(err.response.status).send({ message: err.response.statusText });
        }
        return res.status(500).send();
    }
});


router.post('/data/admin/delete', async (req, res) => {
    try {
        await axios.post(`${usersURL}/admin/delete`, req.body.admins, {
            headers: {
                'Authorization': `Bearer ${req.body.token}`,
                'UserType': "Admin"
            }
        });
        return res.send();

    } catch (err) {
        if (err.response.statusText) {
            console.log(err.response.statusText);
            return res.status(err.response.status).send({ message: err.response.statusText });
        }
        return res.status(500).send();
    }
});

router.patch('/data/update-password', async (req, res) => {
    try {
        const path = req.body.isAdmin ? "admin" : "user";
        await axios.patch(`${usersURL}/${path}/update-password`, req.body.request, {
            headers: {
                'Authorization': `Bearer ${req.body.token}`,
                'UserType': req.body.isAdmin ? "Admin" : "User"
            }
        });
        return res.send();

    } catch (err) {
        if (err.response.statusText) {
            console.log(err.response.data.message);
            return res.status(err.response.status).send({ message: err.response.data.message });
        }
        return res.status(500).send();
    }
});


module.exports = router;