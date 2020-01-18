const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title, 
    req.body.imageUrl, 
    req.body.description, 
    req.body.price);
  product.save()
  .then(  
    res.redirect('/')
  )
  .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product[0]
    })
    .catch(err => console.log(err));
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId,
        updatedTitle = req.body.title,
        updatedPrice = req.body.price,
        updatedImageUrl = req.body.imageUrl,
        updatedDescription = req.body.description,

        updatedProduct = new Product(prodId, updatedTitle, updatedPrice, updatedImageUrl, updatedDescription);
        updatedProduct.save()
          .then(
            res.redirect('/admin/products')
          )
          .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

