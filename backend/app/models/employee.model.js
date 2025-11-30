const MongoDB = require("../utils/mongodb.util");

class EmployeeModel {
  static collectionName = "employees";
  static dbName = "libraryDB";

  static async collection() {
    const client = await MongoDB.connect("mongodb://localhost:27017");
    const db = client.db(this.dbName);
    return db.collection(this.collectionName);
  }

  static async findAll(filter = {}) {
    const col = await this.collection();
    const query = {};
    if (filter.HoTenNV) query.HoTenNV = { $regex: filter.HoTenNV, $options: "i" };
    if (filter.ChucVu) query.ChucVu = filter.ChucVu;
    return col.find(query).sort({ createdAt: -1 }).toArray();
  }

  static async findById(id, ObjectId) {
    const col = await this.collection();
    return col.findOne({ _id: new ObjectId(id) });
  }

  static async create(data) {
    const col = await this.collection();
    const newEmployee = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await col.insertOne(newEmployee);
    newEmployee._id = result.insertedId;
    return newEmployee;
  }

  static async update(id, data, ObjectId) {
    const col = await this.collection();
    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return col.findOne({ _id: new ObjectId(id) });
  }

  static async delete(id, ObjectId) {
    const col = await this.collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  static async deleteAll() {
    const col = await this.collection();
    const result = await col.deleteMany({});
    return result.deletedCount;
  }

  static async findByRole(role) {
    const col = await this.collection();
    return col.find({ ChucVu: role }).toArray();
  }
}

module.exports = EmployeeModel;
