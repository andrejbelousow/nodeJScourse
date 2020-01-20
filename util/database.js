const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'cradmintre3w', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;