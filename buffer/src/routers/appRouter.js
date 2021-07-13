const express = require('express');
const router = new express.Router();
const multer = require('multer')
const sharp = require('sharp')


const upload = multer({
    limits: {
    },
    fileFilter(req, file, cb) {
        cb(undefined, true)
    }
});

router.post('/article', upload.single('article'), async (req, res) => {
    try {
        console.log('here')
        const buffer = await sharp(req.file.buffer).resize({ width: 600, height: 314 }).png().toBuffer()
        req.user.avatar = buffer
        return res.send({ buffer });
    } catch (err) {
        if (err.message) res.status(400).send({ message: `Buffer Service: ${err.message}` });
        return res.status(500).send();
    }
});

router.post('/movie', upload.single('movie'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 675, height: 1000 }).png().toBuffer()
        return res.send({ buffer });

    } catch (err) {
        if (err.message) res.status(400).send({ message: `Buffer Service: ${err.message}` });
        return res.status(500).send();
    }
});



module.exports = router;