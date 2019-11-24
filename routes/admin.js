const express = require('express');

const path = require('path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add product', path: '/admin/add-product'});
});

// /admin/add-product => POST
router.post('/add-product', (req, res)=> {
    products.push({title: req.body.title});
    res.redirect('/');
});

module.exports.router = router;
module.exports.products = products;