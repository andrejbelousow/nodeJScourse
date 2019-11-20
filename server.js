const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extendend: false}));

app.use(adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);



app.listen(3000);