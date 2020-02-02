const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const MongoConnect = require('./util/database').MongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

MongoConnect(() => {
    app.listen(3000);
});

app.use((req, res, next) => {
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


