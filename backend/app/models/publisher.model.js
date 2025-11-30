const MongoDB = require("../utils/mongodb.util");

class PublisherModel {
  static collectionName = "publishers";
  static dbName = "libraryDB";

  static async collection() {
    const client = await MongoDB.connect("mongodb://localhost:27017");
    const db = client.db(this.dbName);
    return db.collection(this.collectionName);
  }

  static async getAll() {
    const col = await this.collection();
    return col.find().toArray();
  }

  static async create(data) {
    const col = await this.collection();
    const exists = await col.findOne({ MaNXB: data.MaNXB });
    if (exists) throw new Error("Mã NXB đã tồn tại!");

    const newPublisher = {
      MaNXB: data.MaNXB,
      TenNXB: data.TenNXB,
      DiaChi: data.DiaChi || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await col.insertOne(newPublisher);
    newPublisher._id = result.insertedId;
    return newPublisher;
  }
}

module.exports = PublisherModel;
