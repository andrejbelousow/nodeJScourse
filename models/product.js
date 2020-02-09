const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const productShema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = mongoose.model('Product', productShema);
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const ObjectId = mongodb.ObjectId;
// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     if(!this._id) {
//       return db.collection('products')
//           .insertOne(this);
//     } else {
//       return db.collection('products').updateOne(
//       { _id: (this._id) },
//       { $set: this});
//     } 
// }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products')
//     .find()
//     .toArray()
//     .then(products => {
//       return products;
//     })
//     .catch(err => console.log(err));
//   }

//   static fetchById(prodId) {
//     const db = getDb();
//     return db.collection('products')
//     .find({_id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product => {
//       return product;
//     })
//     .catch(err => console.log(err));
//   }

//   static deleteProduct(prodId) {
//     const db = getDb();
//     return db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectId(prodId)})
//   }

// }

// module.exports = Product