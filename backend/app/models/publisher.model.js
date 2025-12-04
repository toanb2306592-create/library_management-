const { ObjectId } = require("mongodb");
const { getCollection } = require("../utils/mongodb.util");

class PublisherModel {
  static collectionName = "publishers";

  static async getAll(filter = {}) {
    const col = await getCollection(this.collectionName);

    const query = {};
    if (filter.TenNXB) {
      query.TenNXB = { $regex: filter.TenNXB, $options: "i" };
    }

    return col.find(query).sort({ createdAt: -1 }).toArray();
  }

  static async create(data) {
    const col = await getCollection(this.collectionName);

    // Check mã trùng
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

  static async update(id, data) {
    const col = await getCollection(this.collectionName);

    delete data._id; // bắt buộc xóa

    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );

    return col.findOne({ _id: new ObjectId(id) });
  }

  static async delete(id) {
    const col = await getCollection(this.collectionName);
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}

module.exports = PublisherModel;
