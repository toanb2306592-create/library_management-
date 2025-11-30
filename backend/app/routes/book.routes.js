const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book.controller");

router.route("/")
  .get(BookController.findAll)
  .post(BookController.create);

router.route("/:id")
  .get(BookController.findOne)
  .put(BookController.update)
  .delete(BookController.delete);

router.get("/", async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $lookup: {
          from: "publishers",
          localField: "MaNXB",
          foreignField: "MaNXB",
          as: "publisherInfo",
        },
      },
      {
        $unwind: { path: "$publisherInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: { TenNXB: "$publisherInfo.TenNXB" },
      },
      {
        $project: { publisherInfo: 0 } // loại bỏ field thừa
      }
    ]);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
