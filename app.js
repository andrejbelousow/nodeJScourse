const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const feedRouter = require('./routes/feed');

app.use(bodyParser.json()); //application/json
// GET feed->
app.use('/feed', feedRouter);

app.listen(8080);