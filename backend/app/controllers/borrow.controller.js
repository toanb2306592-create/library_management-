const BorrowModel = require("../models/borrow.model");
const BookModel = require("../models/book.model");

exports.create = async (req, res) => {
  try {
    const data = { ...req.body, status: "Chưa duyệt" };
    const borrow = await BorrowModel.create(data);
    res.json(borrow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.confirm = async (req, res) => {
  try {
    const approve = req.body.approve; // true hoặc false
    const borrow = await BorrowModel.findById(req.params.id);

    if (!borrow) return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });

    const status = approve ? "Đã xác nhận" : "Mượn không thành công";
    await BorrowModel.updateStatus(req.params.id, status);

    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const borrow = await BorrowModel.returnBook(req.params.id, req.body.NgayTra);
    res.json(borrow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const borrows = await BorrowModel.findAll();
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.confirmBorrow = async (req, res) => {
  try {
    const borrow = await BorrowModel.updateStatus(req.params.id, "Đã xác nhận");
    res.json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectBorrow = async (req, res) => {
  try {
    const borrow = await BorrowModel.updateStatus(req.params.id, "Mượn không thành công");
    res.json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa theo _id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu id phiếu mượn" });

    const success = await BorrowModel.deleteById(id);
    if (!success) return res.status(404).json({ message: "Phiếu mượn không tồn tại" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
