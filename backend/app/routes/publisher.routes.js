const express = require("express");
const PublisherModel = require("../models/publisher.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await PublisherModel.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newNXB = await PublisherModel.create(req.body);
    res.json(newNXB);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
