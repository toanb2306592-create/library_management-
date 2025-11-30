const express = require("express");
const BorrowController = require("../controllers/borrow.controller");
const router = express.Router();

router.route("/")
  .get(BorrowController.findAll)
  .post(BorrowController.create);

router.route("/:id/return")
  .put(BorrowController.returnBook);

module.exports = router;
