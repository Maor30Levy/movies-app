const express = require('express');
const router = new express.Router();
const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    fileFilter(req, file, cb) {
        cb(undefined, true)
    }
});

router.post('/data/picture/', upload.single('article'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 600, height: 314 }).png().toBuffer()
        return res.send({ buffer });

    } catch (err) {
        if (err.message) {
            const message = `Buffer Service: ${err.message}`;
            console.log(message);
            return res.status(400).send({ message });
        }

        return res.status(500).send({ message: "Server unavailable" });
    }
});

module.exports = router;