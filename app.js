const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const Order = require('./models/order');
const cartItem = require('./models/cart-item');
const orderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo( User, {constraints: true, onDelete: 'CASCADE'} );
User.hasMany(Product); 
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: cartItem});
Product.belongsToMany(Cart, {through: cartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: orderItem});


sequelize.sync({force: true}).then(res => {
    return User.findByPk(1);
})
.then(user => {
    if(!user) {    
        return User.create({name: 'John', email: 'john@text.com'});
    }
    return user;
})
.then(user => {
    // console.log(user);
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err => console.log(err));

