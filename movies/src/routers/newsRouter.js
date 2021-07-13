const express = require('express');
const router = new express.Router();
const News = require('../db/models/newsModel');
const auth = require('../middleware/auth');

router.get('/news/get-articles', async (req, res) => {
    try {
        const articles = await News.find({});
        return res.send(articles)
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});

router.patch('/news/update-article', auth, async (req, res) => {
    try {

        const article = await News.findOne({ _id: req.body.id });
        if (article) {
            const updates = Object.keys(req.body.article)
            updates.forEach((update) => article[update] = req.body.article[update])
            await article.save();
            console.log("Article updated")
        } else return res.status(400).send({ message: "Unable to update article" })

        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});

router.post('/news/add-article', auth, async (req, res) => {
    try {
        const article = new News(req.body);
        await article.save();
        console.log("Article added")
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});

router.post('/news/delete-articles', auth, async (req, res) => {
    try {
        await News.deleteMany({ _id: { $in: req.body.articles } })
        console.log("Articles deleted")
        return res.send();
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});


module.exports = router;