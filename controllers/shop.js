const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All products',
                path: '/products',
            });
        })
        .catch(err => console.log(err));   
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-list', {
                prods: product,
                pageTitle: product.title,
                path: '/products',
            });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart' 
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Yours orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('/shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};


