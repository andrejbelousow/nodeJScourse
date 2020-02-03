const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    if(!this._id) {
      return db.collection('products')
        .insertOne(this)
        .then(result => {
          console.log('Product saved')
        })
        .catch(err => console.log(err));
    } else {
      return db.collection('products').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: {title: this.title, price: this.price, 
       description: this.description, imageUrl: this.imageUrl }});
    } 
}

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then(products => {
      return products;
    })
    .catch(err => console.log(err));
  }

  static fetchById(prodId) {
    const db = getDb();
    return db.collection('products')
    .find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then(product => {
      return product;
    })
    .catch(err => console.log(err));
  }

  static deleteProduct(prodId) {
    const db = getDb();
    return db.collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
  }

}

module.exports = Product