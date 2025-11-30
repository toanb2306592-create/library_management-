// backend/app/controllers/publisher.controller.js
const PublisherModel = require("../models/publisher.model");

exports.getAllPublishers = async (req, res) => {
  try {
    const publishers = await PublisherModel.getAll();
    res.json(publishers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPublisher = async (req, res) => {
  try {
    const newPub = await PublisherModel.create(req.body);
    res.json(newPub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
