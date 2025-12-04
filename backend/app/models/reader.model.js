const MongoDB = require("../utils/mongodb.util");
const { ObjectId } = require("mongodb");

class ReaderModel {
  static collectionName = "readers";
  static dbName = "libraryDB";

  static async collection() {
    const client = await MongoDB.connect("mongodb://localhost:27017");
    return client.db(this.dbName).collection(this.collectionName);
  }

  static async create(data) {
    const col = await this.collection();
    const result = await col.insertOne(data);
    return { ...data, _id: result.insertedId };
  }

  static async findByEmail(email) {
    const col = await this.collection();
    return col.findOne({ email });
  }

  static async findById(id) {
    const col = await this.collection();
    if (!ObjectId.isValid(id)) return null; // tránh crash nếu id không hợp lệ
    return col.findOne({ _id: new ObjectId(id) });
  }
}

module.exports = ReaderModel;
