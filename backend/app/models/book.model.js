const MongoDB = require("../utils/mongodb.util");
const { ObjectId } = require("mongodb");

class BookModel {
  static collectionName = "books";
  static dbName = "libraryDB";

  static async collection() {
    const client = await MongoDB.connect();
    return client.db(this.dbName).collection(this.collectionName);
  }

  static async findAll(filter = {}) {
    const col = await this.collection();
    const query = {};
    if (filter.TenSach) query.TenSach = { $regex: filter.TenSach, $options: "i" };
    if (filter.MaNXB) query.MaNXB = filter.MaNXB;
    return await col.find(query).toArray();
  }

  static async findById(id) {
    if (!ObjectId.isValid(id)) return null;
    const col = await this.collection();
    return await col.findOne({ _id: new ObjectId(id) });
  }

  static async create(data) {
    const col = await this.collection();
    const newBook = {
      MaSach: data.MaSach,
      TenSach: data.TenSach,
      DonGia: Number(data.DonGia),
      SoQuyen: Number(data.SoQuyen),
      NamXuatBan: Number(data.NamXuatBan),
      MaNXB: data.MaNXB,
      image: data.image || [],
      createdAt: new Date(),
    };
    const result = await col.insertOne(newBook);
    return { _id: result.insertedId, ...newBook };
  }

  static async update(id, data) {
    if (!ObjectId.isValid(id)) return null;
    const col = await this.collection();
    const _id = new ObjectId(id);
    delete data._id;
    const result = await col.findOneAndUpdate(
      { _id },
      { $set: data },
      { returnDocument: "after" }
    );
    return result.value;
  }

  static async delete(id) {
    if (!ObjectId.isValid(id)) return false;
    const col = await this.collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async countByPublisher(MaNXB) {
    const col = await this.collection();
    return col.countDocuments({ MaNXB });
  }

  static async changeQuantity(bookId, delta) {
    const col = await this.collection();
    const book = await col.findOne({ _id: new ObjectId(bookId) });
    if (!book) throw new Error("Sách không tồn tại");

    const newQuantity = (book.SoQuyen || 0) + delta;
    if (newQuantity < 0) throw new Error("Số lượng sách không đủ");

    await col.updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { SoQuyen: newQuantity, updatedAt: new Date() } }
    );
    return newQuantity;
  }
}

module.exports = BookModel;
