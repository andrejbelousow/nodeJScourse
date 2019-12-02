const Product = require('../modules/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        activeAddProduct: true,
        formsCSS: true,
        productCSS: true,
    });
}

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        productCSS: true,
        activeShop: true
    }));
}


