exports.error = (req, res, next) => {
    res.status(404).render('not-found', {
        pageTitle: 'Page not found',
        path: ''
    });
};