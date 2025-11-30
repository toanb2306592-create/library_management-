const MongoDB = require("../utils/mongodb.util");
const { ObjectId } = require("mongodb");
const BookModel = require("./book.model");

class BorrowModel {
  static collectionName = "borrows";
  static dbName = "libraryDB";

  static async collection() {
    const client = await MongoDB.connect("mongodb://localhost:27017");
    const db = client.db(this.dbName);
    return db.collection(this.collectionName);
  }

  static async create(data) {
    if (data.NgayTra && new Date(data.NgayTra) <= new Date(data.NgayMuon)) {
      throw new Error("Ngày trả phải lớn hơn ngày mượn");
    }

    await BookModel.changeQuantity(data.MaSach, -1);

    const newBorrow = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await (await this.collection()).insertOne(newBorrow);
    newBorrow._id = result.insertedId;
    return newBorrow;
  }

  static async returnBook(id, NgayTra) {
    const col = await this.collection();
    const borrow = await col.findOne({ _id: new ObjectId(id) });
    if (!borrow) throw new Error("Phiếu mượn không tồn tại");
    if (new Date(NgayTra) <= new Date(borrow.NgayMuon)) {
      throw new Error("Ngày trả phải lớn hơn ngày mượn");
    }

    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { NgayTra, updatedAt: new Date() } }
    );

    await BookModel.changeQuantity(borrow.MaSach, 1);

    return { ...borrow, NgayTra };
  }

  static async findAll(filter = {}) {
    const col = await this.collection();
    const query = {};
    if (filter.MaDG) query.MaDG = filter.MaDG;
    if (filter.MaSach) query.MaSach = filter.MaSach;
    if (filter.NgayMuon) query.NgayMuon = filter.NgayMuon;
    return col.find(query).sort({ createdAt: -1 }).toArray();
  }
}

module.exports = BorrowModel;
