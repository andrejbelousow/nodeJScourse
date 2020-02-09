const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const sequelize = require('./util/database');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5e400f480a09162ef0327916')
        .then(user => {
            req.user = user;
            next(); 
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://andrey:cradmintre3w@firstclaster-70jaz.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Max',
                email: 'test@mail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
        app.listen(3000);
    })
})
.catch(err => console.log(err));


