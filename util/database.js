const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (callback) => {
    mongoClient.connect(
            'mongodb+srv://andrey:cradmintre3w@firstclaster-70jaz.mongodb.net/shop?retryWrites=true&w=majority'
        )
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        })
        .catch(err => console.log(err));
}

getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;

