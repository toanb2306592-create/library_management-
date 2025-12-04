const BorrowModel = require("../models/borrow.model");
const BookModel = require("../models/book.model");

class BorrowService {
  // Tạo phiếu mượn
  async createBorrow(data) {
    const newBorrow = {
      ...data,
      status: "Chưa duyệt",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await BorrowModel.create(newBorrow);
  }

  // Admin xác nhận / từ chối mượn
  async confirmBorrow(id, approve = true) {
    const borrow = await BorrowModel.findById(id);
    if (!borrow) throw new Error("Phiếu mượn không tồn tại");

    let status;
    if (approve) {
      status = "Đã xác nhận";
      await BookModel.changeQuantity(borrow.MaSach, -1);
    } else {
      status = "Mượn không thành công";
    }

    return await BorrowModel.updateStatus(id, status);
  }

  // Trả sách
  async returnBook(id, NgayTra) {
    return await BorrowModel.returnBook(id, NgayTra);
  }

  // Lấy tất cả hoặc theo filter
  async findAll(filter = {}) {
    return await BorrowModel.findAll(filter);
  }

  // Xóa phiếu theo _id
  async delete(id) {
    const success = await BorrowModel.deleteById(id);
    if (!success) {
      throw new Error("Phiếu mượn không tồn tại hoặc đã xóa");
    }
    return true;
  }
}

module.exports = BorrowService;
