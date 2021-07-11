const express = require('express');
const router = new express.Router();
const User = require('../db/models/userModel');
const auth = require('../middleware/auth');
router.post('/', async (req, res) => {
    try {
        return res.send();

    } catch (err) {
        return res.status(500).send();
    }
});

router.post('/user/subscribe', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).send({ user, token });

    } catch (err) {
        console.log(err)
        return res.status(500).send();
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (err) {
        return res.status(400).send();
    }
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();

        res.send()
    } catch (err) {
        res.status(500).send()
    }
});


module.exports = router;