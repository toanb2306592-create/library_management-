// src/controllers/book.controller.js
const BookModel = require("../models/book.model");
const ApiError = require("../api-error");

class BookController {
  static async findAll(req, res, next) {
    try {
      const books = await BookModel.findAll({
        TenSach: req.query.TenSach,
        MaNXB: req.query.MaNXB,
      });
      res.json(books);
    } catch (err) {
      next(new ApiError(500, "Lỗi khi lấy danh sách sách"));
    }
  }

  static async findOne(req, res, next) {
    try {
      const book = await BookModel.findById(req.params.id);
      if (!book) return next(new ApiError(404, "Sách không tồn tại"));
      res.json(book);
    } catch (err) {
      next(new ApiError(500, `Lỗi khi tìm sách với id=${req.params.id}`));
    }
  }

  static async create(req, res, next) {
    try {
      const book = await BookModel.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      next(new ApiError(500, "Lỗi khi tạo sách"));
    }
  }

  static async update(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
    }

    try {
      const updatedBook = await BookModel.update(req.params.id, req.body);

      // Trả về document mới cho frontend
      res.json(updatedBook);
    } catch (err) {
      console.error(err);
      next(new ApiError(500, `Lỗi khi cập nhật sách với id=${req.params.id}`));
    }
  }

  static async delete(req, res, next) {
    try {
      const deleted = await BookModel.delete(req.params.id);
      if (!deleted) return next(new ApiError(404, "Sách không tồn tại"));
      res.json({ message: "Xóa sách thành công" });
    } catch (err) {
      next(new ApiError(500, `Lỗi khi xóa sách với id=${req.params.id}`));
    }
  }
}

module.exports = BookController;
