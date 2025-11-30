const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class ReaderService {
  constructor(client) {
    this.Reader = client.db("libraryDB").collection("readers");
  }

  // Lấy danh sách đọc giả, filter là object MongoDB
  async find(filter = {}) {
    return await this.Reader.find(filter).toArray();
  }

  // Lấy 1 đọc giả theo MaDG
  async findByMaDG(MaDG) {
    return await this.Reader.findOne({ MaDG });
  }

  // Tạo đọc giả mới (nếu chưa có MaDG, tự sinh)
  async create(data) {
    if (!data.MaDG) {
      data.MaDG = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    const result = await this.Reader.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { _id: result.insertedId, ...data };
  }

  // Cập nhật đọc giả theo MaDG
  async update(MaDG, data) {
    await this.Reader.updateOne(
      { MaDG },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return this.findByMaDG(MaDG);
  }

  // Xóa đọc giả theo MaDG
  async delete(MaDG) {
    const result = await this.Reader.deleteOne({ MaDG });
    return result.deletedCount > 0;
  }

  // Xóa tất cả đọc giả
  async deleteAll() {
    const result = await this.Reader.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ReaderService;
