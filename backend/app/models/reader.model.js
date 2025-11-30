const MongoDB = require("../utils/mongodb.util");

class ReaderModel {
  static collectionName = "readers";
  static dbName = "libraryDB";

  static async collection() {
    const client = await MongoDB.connect("mongodb://localhost:27017");
    const db = client.db(this.dbName);
    return db.collection(this.collectionName);
  }

  static generateMaDG() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  static async create(data) {
    const col = await this.collection();
    if (!data.MaDG) {
      let maDG, exists = true;
      while (exists) {
        maDG = this.generateMaDG();
        exists = await col.findOne({ MaDG: maDG });
      }
      data.MaDG = maDG;
    }

    const newReader = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await col.insertOne(newReader);
    newReader._id = result.insertedId;
    return newReader;
  }

  static async findByName(HoLot, Ten) {
    const col = await this.collection();
    return col.findOne({
      HoLot: { $regex: HoLot, $options: "i" },
      Ten: { $regex: Ten, $options: "i" }
    });
  }

  static async findAll() {
    const col = await this.collection();
    return col.find().sort({ createdAt: -1 }).toArray();
  }

  static async findOne(MaDG) {
    const col = await this.collection();
    return col.findOne({ MaDG });
  }

  static async update(MaDG, data) {
    const col = await this.collection();
    await col.updateOne({ MaDG }, { $set: { ...data, updatedAt: new Date() } });
    return this.findOne(MaDG);
  }

  static async delete(MaDG) {
    const col = await this.collection();
    const result = await col.deleteOne({ MaDG });
    return result.deletedCount === 1;
  }
}

module.exports = ReaderModel;
