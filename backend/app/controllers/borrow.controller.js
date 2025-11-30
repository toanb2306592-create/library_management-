const BorrowModel = require("../models/borrow.model");
const ApiError = require("../api-error");

class BorrowController {
  static async create(req, res, next) {
    try {
      const borrow = await BorrowModel.create(req.body);
      res.send(borrow);
    } catch (err) {
      next(new ApiError(500, err.message || "Lỗi khi tạo phiếu mượn"));
    }
  }

  static async returnBook(req, res, next) {
    try {
      const id = req.params.id;
      const borrow = await BorrowModel.returnBook(id, req.body.NgayTra);
      res.send(borrow);
    } catch (err) {
      next(new ApiError(500, err.message || "Lỗi khi trả sách"));
    }
  }

  static async findAll(req, res, next) {
    try {
      const borrows = await BorrowModel.findAll(req.query);
      res.send(borrows);
    } catch (err) {
      next(new ApiError(500, "Lỗi khi lấy danh sách mượn sách"));
    }
  }
}

module.exports = BorrowController;
