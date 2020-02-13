const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: loggedIn
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('5e400f480a09162ef0327916')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
        console.log(err);
    });
};