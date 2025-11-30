const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
const BookService = require("./book.service"); // để thay đổi số lượng sách

class BorrowService {
  constructor(client) {
    this.Borrow = client.db("libraryDB").collection("borrows");
    this.bookService = new BookService(client);
  }

  // Lấy tất cả phiếu mượn
  async find(filter = {}) {
    return await this.Borrow.find(filter).sort({ createdAt: -1 }).toArray();
  }

  // Lấy 1 phiếu mượn theo _id
  async findById(id) {
    return await this.Borrow.findOne({ _id: new ObjectId(id) });
  }

  // Tạo phiếu mượn
  async create(data) {
    if (data.NgayTra && new Date(data.NgayTra) <= new Date(data.NgayMuon)) {
      throw new Error("Ngày trả phải lớn hơn ngày mượn");
    }

    // Giảm số lượng sách đi 1
    await this.bookService.changeQuantity(data.MaSach, -1);

    const result = await this.Borrow.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return { _id: result.insertedId, ...data };
  }

  // Trả sách
  async returnBook(id, NgayTra) {
    const borrow = await this.findById(id);
    if (!borrow) throw new Error("Phiếu mượn không tồn tại");
    if (new Date(NgayTra) <= new Date(borrow.NgayMuon)) {
      throw new Error("Ngày trả phải lớn hơn ngày mượn");
    }

    await this.Borrow.updateOne(
      { _id: new ObjectId(id) },
      { $set: { NgayTra, updatedAt: new Date() } }
    );

    // Tăng số lượng sách lên 1
    await this.bookService.changeQuantity(borrow.MaSach, 1);

    return { ...borrow, NgayTra };
  }

  // Xóa phiếu mượn
  async delete(id) {
    const result = await this.Borrow.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Xóa tất cả phiếu mượn
  async deleteAll() {
    const result = await this.Borrow.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = BorrowService;
