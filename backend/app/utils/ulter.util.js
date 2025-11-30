const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Thư mục lưu ảnh
const uploadDir = path.join(__dirname, "../uploads/books");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Chỉ cho phép file ảnh!"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
