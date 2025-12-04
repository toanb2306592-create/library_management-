const express = require("express");
const publisherController = require("../controllers/publisher.controller");

const router = express.Router();

router.route("/")
  .get(publisherController.getAllPublishers)
  .post(publisherController.createPublisher);

router.route("/:id")
  .put(publisherController.updatePublisher)
  .delete(publisherController.deletePublisher);

module.exports = router;
