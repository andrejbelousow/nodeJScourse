exports.getLogin = (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;
    console.log(loggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: loggedIn
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
        console.log(err);
    });
};