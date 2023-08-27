const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const mongoDbUrl =
  "mongodb+srv://webdev-mongodb:webdev-mongodb@devconnector.ahxye.mongodb.net/shop?retryWrites=true";

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("database is already initialized");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback("err", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
