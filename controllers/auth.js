exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    // const loggedIn = req.get('Cookie').trim().split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};