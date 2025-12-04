const express = require("express");
const router = express.Router();
const BorrowController = require("../controllers/borrow.controller");

router.get("/", BorrowController.findAll); // lấy danh sách
router.post("/", BorrowController.create); // tạo phiếu mượn
router.put("/confirm/:id", BorrowController.confirm); // admin xác nhận
router.put("/return/:id", BorrowController.returnBook); // trả sách
router.delete("/:id", BorrowController.delete); // xóa theo id

router.patch("/:id/confirm", BorrowController.confirmBorrow);
router.patch("/:id/reject", BorrowController.rejectBorrow);

module.exports = router;
