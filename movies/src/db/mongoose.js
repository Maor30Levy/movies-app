const mongoose = require('mongoose');
const { keys } = require('../keys/keys');

const { mongodbHost, mongodbPort } = keys;

const mongodbUrl = process.env.MONGODB || `mongodb://${mongodbHost}:${mongodbPort}/movie-app`;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((res) => {
    console.log("Mongo is live on port " + (mongodbPort || '27107'));
}).catch((err) => {
    console.log("Failed to connect to Mongo Server");
});

