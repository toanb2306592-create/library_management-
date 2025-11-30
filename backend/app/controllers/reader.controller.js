const ReaderModel = require("../models/reader.model");
const ApiError = require("../api-error");

class ReaderController {
  static async create(req, res, next) {
    try {
      const reader = await ReaderModel.create(req.body);
      res.send(reader);
    } catch (err) {
      next(new ApiError(500, err.message || "Lỗi khi tạo đọc giả"));
    }
  }

  static async findAll(req, res, next) {
    try {
      const readers = await ReaderModel.findAll();
      res.send(readers);
    } catch (err) {
      next(new ApiError(500, "Lỗi khi lấy danh sách đọc giả"));
    }
  }

  static async findOne(req, res, next) {
    try {
      const reader = await ReaderModel.findOne(req.params.MaDG);
      if (!reader) throw new ApiError(404, "Đọc giả không tồn tại");
      res.send(reader);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const reader = await ReaderModel.update(req.params.MaDG, req.body);
      res.send(reader);
    } catch (err) {
      next(new ApiError(500, err.message || "Lỗi khi cập nhật đọc giả"));
    }
  }

  static async delete(req, res, next) {
    try {
      const deleted = await ReaderModel.delete(req.params.MaDG);
      if (!deleted) throw new ApiError(404, "Đọc giả không tồn tại");
      res.send({ message: "Xóa thành công" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ReaderController;
