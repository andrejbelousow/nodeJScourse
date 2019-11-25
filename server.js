const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extendend: false}));

app.use('/admin', adminData.router);
app.use(shopRoutes);
app.use(errorRoutes);



app.listen(3000);