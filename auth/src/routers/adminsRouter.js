const express = require('express');
const router = new express.Router();
const Admin = require('../db/models/adminModel');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const admin = new Admin({
        name: "admin",
        email: "admin@admin.com",
        password: "Aa123456"
    });
    try {
        await admin.save();
        const token = await admin.generateAuthToken();

        return res.status(201).send({ user: admin, token });

    } catch (err) {
        console.log(err)
        return res.status(500).send("Went wrong!");
    }
});

router.post('/admin/subscribe', async (req, res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        return res.status(201).send({ user: admin });

    } catch (err) {

        return res.status(500).send();
    }
});

router.post('/admin/login', async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(email, password)

        const user = await Admin.findByCredentials(email, password);

        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (err) {
        return res.status(400).send();
    }
});

router.post('/admin/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();

        return res.send();
    } catch (err) {
        return res.status(500).send()
    }
});

router.get('/admin/get-all', auth, async (req, res) => {
    try {
        const admins = await Admin.find({});

        return res.send(admins);
    } catch (err) {
        return res.status(500).send()
    }
});


module.exports = router;