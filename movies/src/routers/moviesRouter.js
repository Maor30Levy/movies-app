const express = require('express');
const router = new express.Router();
const Admin = require('../db/models/adminModel');
const User = require('../db/models/userModel');
const auth = require('../middleware/auth');

router.get('/admin/get-all', auth, async (req, res) => {
    try {
        const admins = await Admin.find({});
        return res.send(admins);
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});


router.post('/admin/delete', auth, async (req, res) => {
    try {
        await Admin.deleteMany({ _id: { $in: req.body } });
        console.log('Admin accounts ' + req.body.toString() + ' has been deleted')
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});


router.patch('/admin/update-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (await Admin.checkPassword(req.user.email, currentPassword))
            req.user.password = newPassword;
        await req.user.save();
        return res.send();
    } catch (err) {
        console.log(err.message)
        if (err.message === "Invalid password")
            return res.status(400).send({ message: err.message });
        return res.status(500).send();
    }
});

module.exports = router;