const express = require('express');
const cors = require('cors');
const { keys } = require('./keys/keys');
const app = express();
app.use(express.json());
app.use(cors());
const { port } = keys;
const authRouter = require('./routers/AuthRouter');
const dataRouter = require('./routers/DataRouter');

app.use(authRouter);
app.use(dataRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});