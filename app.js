const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// const sequelize = require('./util/database');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://andrey:cradmintre3w@firstclaster-70jaz.mongodb.net/shop';

const app = express();
const sessionStore = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStorage}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: sessionStore
}));

app.use(csrfProtection);

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use((error, req, res, next) => {
    res.status(500).render('505', {
        pageTitle: 'Error!',
        path: '/505',
        isAuthenticated: req.session.isLoggedIn
    });
});

app.use(errorController.get404);


mongoose.connect(MONGODB_URI)
.then(result => {
        app.listen(3000);
    })
.catch(err => console.log(err));


