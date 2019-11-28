const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');
const errorController = require('./controllers/not-found');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extendend: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.error);



app.listen(3000);