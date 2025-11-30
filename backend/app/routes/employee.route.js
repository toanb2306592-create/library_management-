const express = require("express");
const EmployeeController = require("../controllers/employee.controller");

const router = express.Router();

router.route("/")
  .get(EmployeeController.findAll)
  .post(EmployeeController.create)
  .delete(EmployeeController.deleteAll);

router.route("/role/:role")
  .get(EmployeeController.findByRole);

router.route("/:id")
  .get(EmployeeController.findOne)
  .put(EmployeeController.update)
  .delete(EmployeeController.delete);

module.exports = router;
