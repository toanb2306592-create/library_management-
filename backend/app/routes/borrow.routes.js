const express = require("express");
const router = express.Router();
const BorrowController = require("../controllers/borrow.controller");

router.get("/", BorrowController.findAll); 
router.post("/", BorrowController.create); 
router.put("/confirm/:id", BorrowController.confirm); 
router.put("/return/:id", BorrowController.returnBook); 
router.delete("/:id", BorrowController.delete); 

router.patch("/:id/confirm", BorrowController.confirmBorrow);
router.patch("/:id/reject", BorrowController.rejectBorrow);

module.exports = router;
