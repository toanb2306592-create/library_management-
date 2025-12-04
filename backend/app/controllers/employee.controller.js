const EmployeeModel = require("../models/employee.model");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const ApiError = require("../api-error");

class EmployeeController {
  static async create(req, res, next) {
    try {
      if (req.body.Password) {
        req.body.Password = await bcrypt.hash(req.body.Password, 10);
      }
      const employee = await EmployeeModel.create(req.body);
      res.send(employee);
    } catch (err) {
      next(new ApiError(500, err.message || "Lỗi khi tạo nhân viên"));
    }
  }

  static async findAll(req, res, next) {
    try {
      const filter = {
        HoTenNV: req.query.HoTenNV || undefined,
        ChucVu: req.query.ChucVu || undefined,
      };
      const employees = await EmployeeModel.findAll(filter);
      res.send(employees);
    } catch (err) {
      next(new ApiError(500, "Lỗi khi lấy danh sách nhân viên"));
    }
  }

  static async findOne(req, res, next) {
    try {
      const employee = await EmployeeModel.findById(req.params.id, ObjectId);
      if (!employee) return next(new ApiError(404, "Nhân viên không tồn tại"));
      res.send(employee);
    } catch (err) {
      next(new ApiError(500, `Lỗi khi tìm nhân viên với id=${req.params.id}`));
    }
  }

  static async update(req, res, next) {
    try {
      if (req.body.Password) {
        req.body.Password = await bcrypt.hash(req.body.Password, 10);
      }
      const employee = await EmployeeModel.update(req.params.id, req.body, ObjectId);
      if (!employee) return next(new ApiError(404, "Nhân viên không tồn tại"));
      res.send(employee);
    } catch (err) {
      next(new ApiError(500, `Lỗi khi cập nhật nhân viên với id=${req.params.id}`));
    }
  }

  static async delete(req, res, next) {
    try {
      const deleted = await EmployeeModel.delete(req.params.id, ObjectId);
      if (!deleted) return next(new ApiError(404, "Nhân viên không tồn tại"));
      res.send({ message: "Xóa nhân viên thành công" });
    } catch (err) {
      next(new ApiError(500, `Lỗi khi xóa nhân viên với id=${req.params.id}`));
    }
  }

  static async deleteAll(req, res, next) {
    try {
      const count = await EmployeeModel.deleteAll();
      res.send({ message: `Đã xóa ${count} nhân viên` });
    } catch (err) {
      next(new ApiError(500, "Lỗi khi xóa tất cả nhân viên"));
    }
  }

  static async findByRole(req, res, next) {
    try {
      const employees = await EmployeeModel.findByRole(req.params.role);
      res.send(employees);
    } catch (err) {
      next(new ApiError(500, "Lỗi khi lấy nhân viên theo chức vụ"));
    }
  }
}

module.exports = EmployeeController;
