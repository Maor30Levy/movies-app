const express = require('express');
const cors = require('cors');
const { keys } = require('./keys/keys');
const app = express();
app.use(express.json());
app.use(cors());
const { port } = keys;
const appRouter = require('./routers/appRouter');
app.use(appRouter);
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});