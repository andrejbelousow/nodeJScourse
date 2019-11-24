const express = require('express');

const path = require('path');

const router = express.Router();

router.use((req, res, next) => {
    res.status(404).render('not-found', {pageTitle: 'Page not found'})
});

module.exports = router;