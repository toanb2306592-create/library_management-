const express = require("express");
const ReaderController = require("../controllers/reader.controller");
const router = express.Router();

router.route("/")
  .get(ReaderController.findAll)
  .post(ReaderController.create);

router.route("/:MaDG")
  .get(ReaderController.findOne)
  .put(ReaderController.update)
  .delete(ReaderController.delete);

module.exports = router;
