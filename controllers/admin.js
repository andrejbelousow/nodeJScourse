const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title,
         imageUrl = req.body.imageUrl,
         price = req.body.price
         description = req.body.description;

  const product = new Product({
    title: title, 
    description: description, 
    price: price, 
    imageUrl: imageUrl,
    userId: req.user._id });
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
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.LoggedIn
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

        Product.findById(prodId)
          .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl
            return product.save();
          })
          .then(result => res.redirect('/admin/products/'))
          .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(result => {
      res.redirect('/admin/products/');
    }).catch(err => console.log(err));
}

