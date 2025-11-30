const { MongoClient } = require("mongodb");

let client = null;

async function connect(uri) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Kết nối MongoDB thành công");
  }
  return client;
}

async function getCollection(collectionName, dbName = "libraryDB") {
  const client = await connect("mongodb://localhost:27017");
  return client.db(dbName).collection(collectionName);
}

module.exports = { connect, getCollection };
