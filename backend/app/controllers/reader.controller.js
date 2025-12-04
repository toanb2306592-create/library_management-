const ReaderService = require("../services/reader.service");
const ReaderModel = require("../models/reader.model");
const ApiError = require("../api-error");

class ReaderController {
  async signup(req, res, next) {
    try {
      const reader = await ReaderService.register(req.body);
      res.json({ message: "Đăng ký thành công!", reader });
    } catch (err) {
      next(new ApiError(400, err.message));
    }
  }

  async login(req, res, next) {
    try {
      const result = await ReaderService.login(req.body);
      res.json(result);
    } catch (err) {
      next(new ApiError(400, err.message));
    }
  }

  async getById(req, res, next) {
    try {
      const reader = await ReaderModel.findById(req.params.id);
      if (!reader) {
        return next(new ApiError(404, "Người mượn không tồn tại"));
      }
      res.json(reader);
    } catch (err) {
      next(new ApiError(500, "Lỗi server khi lấy người mượn"));
    }
  }
}

module.exports = new ReaderController();
