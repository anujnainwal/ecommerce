const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  mongoClient
    .connect("mongodb://127.0.0.1:27017/node_ecommerce")
    .then((result) => {
      callback(result);
    })
    .catch((err) => console.error(err));
};
module.exports = mongoConnect;
