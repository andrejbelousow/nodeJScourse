const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title,
         imageUrl = req.body.imageUrl,
         price = req.body.price
         description = req.body.description;
         userId = req.user._id;   

  const product = new Product(title, price, description, imageUrl, null, userId);
  product.save()
  .then(result => {
    console.log('Adding was success');
    res.redirect('/admin/products');
  }).catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.fetchById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
    })
  })
  .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId,
        updatedTitle = req.body.title,
        updatedPrice = req.body.price,
        updatedImageUrl = req.body.imageUrl,
        updatedDescription = req.body.description;

        const updatedProduct = new Product(updatedTitle, updatedPrice, 
                         updatedDescription, updatedImageUrl, prodId);
          updatedProduct.save()
          .then(result => {
            res.redirect('/admin/products/');
          })
          .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProduct(prodId)
    .then(result => {
      res.redirect('/admin/products/');
    }).catch(err => console.log(err));
}

