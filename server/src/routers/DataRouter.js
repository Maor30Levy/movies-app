const express = require('express');
const router = new express.Router();
const axios = require('axios');
const { keys } = require('../keys/keys');
const { usersHost, usersPort, moviesHost, moviesPort } = keys;
const usersURL = `${usersHost}:${usersPort}`;
const moviesURL = `${moviesHost}:${moviesPort}`;

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
            console.log(err.response?.statusText);
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
        if (err.response?.statusText) {
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
        if (err.response?.statusText) {
            console.log(err.response.data.message);
            return res.status(err.response.status).send({ message: err.response.data.message });
        }
        return res.status(500).send();
    }
});


router.post('/data/add-article', async (req, res) => {
    try {
        await axios.post(`${moviesURL}/news/add-article`, req.body.article, {
            headers: {
                'Authorization': `Bearer ${req.body.token}`,
                'UserType': "Admin"
            }
        });
        return res.send();

    } catch (err) {
        if (err.response?.statusText) {
            console.log(err.response.data.message);
            return res.status(err.response.status).send({ message: err.response.data.message });
        }
        console.log(err.message)
        return res.status(500).send();
    }
});

router.patch('/data/update-article', async (req, res) => {
    try {
        const { id, article } = req.body;
        await axios.patch(`${moviesURL}/news/update-article`, { id, article }, {
            headers: {
                'Authorization': `Bearer ${req.body.token}`,
                'UserType': "Admin"
            }
        });
        return res.send();

    } catch (err) {
        if (err.response?.statusText) {
            console.log(err.response.data.message);
            return res.status(err.response.status).send({ message: err.response.data.message });
        }
        console.log(err.message)
        return res.status(500).send();
    }
});

router.post('/data/delete-articles', async (req, res) => {
    try {
        const { articles } = req.body;
        await axios.post(`${moviesURL}/news/delete-articles`, { articles }, {
            headers: {
                'Authorization': `Bearer ${req.body.token}`,
                'UserType': "Admin"
            }
        });
        return res.send();

    } catch (err) {
        if (err.response?.statusText) {
            console.log(err.response.data.message);
            return res.status(err.response.status).send({ message: err.response.data.message });
        }
        console.log(err.message)
        return res.status(500).send();
    }
});


router.get('/data/get-articles', async (req, res) => {
    try {
        const { data } = await axios.get(`${moviesURL}/news/get-articles`);
        return res.send(data);

    } catch (err) {
        if (err.response?.statusText) {
            console.log(err.response.data.message);
            return res.status(err.response.status).send({ message: err.response.data.message });
        }
        console.log(err.message)
        return res.status(500).send();
    }
});

module.exports = router;