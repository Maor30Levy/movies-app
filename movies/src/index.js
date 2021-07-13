const express = require('express');
const cors = require('cors');
const { keys } = require('./keys/keys');
const app = express();
app.use(express.json());
app.use(cors());
const { port } = keys;

const moviesRouter = require('./routers/moviesRouter');
const theatersRouter = require('./routers/theatersRouter');
const availabilityRouter = require('./routers/availabilityRouter');
const newsRouter = require('./routers/newsRouter');

app.use(moviesRouter);
app.use(theatersRouter);
app.use(availabilityRouter);
app.use(newsRouter);

require('./db/mongoose');

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});