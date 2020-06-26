global.config = require('./index');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _id;

const mongodbConnect = callback => {
  MongoClient.connect(global.config.mongodbClient,{useUnifiedTopology: true}).then(client => {
    console.log('Successfully connected to Database!');
    _id = client.db();
    callback();
  }).catch(err => {
    console.log(err);
    throw err;
  });
}

const getDb = () => {
  if(_id) {
    return _id;
  }
  throw 'No Dabase found!';
}

exports.mongodbConnect = mongodbConnect;
exports.getDb = getDb;