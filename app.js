const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const sequelize = require('./util/database');
const MongoConnect = require('./util/database').MongoConnect;
const mongodb = require('mongodb');
const User = require('./models/user');

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

let userId;

app.use((req, res, next) => {
    User.findById('5e387ba1d9b8ea3a7c4ca69b')
        .then(user => {
            req.user = user;
            next()
        })
        .catch(err => console.log(err));
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


