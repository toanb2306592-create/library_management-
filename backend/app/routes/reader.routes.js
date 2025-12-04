const express = require("express");
const router = express.Router();
const readerController = require("../controllers/reader.controller");

router.post("/signup", readerController.signup);
router.post("/login", readerController.login);

router.get("/:id", readerController.getById);

module.exports = router;
