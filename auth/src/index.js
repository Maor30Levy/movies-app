const express = require('express');
const cors = require('cors');
const { keys } = require('./keys/keys');
const app = express();
app.use(express.json());
app.use(cors());
const { port } = keys;
const adminsRouter = require('./routers/adminsRouter');
const usersRouter = require('./routers/usersRouter');
app.use(adminsRouter);
app.use(usersRouter);

require('./db/mongoose');

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});