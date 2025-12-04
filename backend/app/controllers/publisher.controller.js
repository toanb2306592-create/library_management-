const PublisherModel = require("../models/publisher.model");
const ApiError = require("../api-error");

class PublisherController {
  async getAllPublishers(req, res, next) {
    try {
      const filter = {};
      if (req.query.TenNXB) filter.TenNXB = req.query.TenNXB;

      const data = await PublisherModel.getAll(filter);
      res.json(data);
    } catch (err) {
      next(new ApiError(500, err.message));
    }
  }

  async createPublisher(req, res, next) {
    try {
      const created = await PublisherModel.create(req.body);
      res.json(created);
    } catch (err) {
      next(new ApiError(400, err.message));
    }
  }

  async updatePublisher(req, res, next) {
  try {
    const data = { ...req.body };

    // XÓA _id ĐỂ TRÁNH LỖI "immutable field _id"
    delete data._id;

    const updated = await PublisherModel.update(req.params.id, data);

    if (!updated) return next(new ApiError(404, "Không tìm thấy NXB"));

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
}


  async deletePublisher(req, res, next) {
    try {
      const deleted = await PublisherModel.delete(req.params.id);
      if (!deleted) return next(new ApiError(404, "NXB không tồn tại"));

      res.json({ message: "Xóa thành công" });
    } catch (err) {
      next(new ApiError(500, err.message));
    }
  }
}

module.exports = new PublisherController();
