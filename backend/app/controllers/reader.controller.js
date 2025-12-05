const ReaderModel = require("../models/reader.model"); 
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 


class ReaderController {
    async signup(req, res, next) {
    try {
      const exists = await ReaderModel.findByEmail(req.body.email);
      if (exists) {
        throw new Error("Email đã được sử dụng!");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const readerData = {
        HoLot: req.body.HoLot,
        Ten: req.body.Ten,
        NgaySinh: req.body.NgaySinh,
        Phai: req.body.Phai,
        DiaChi: req.body.DiaChi,
        DienThoai: req.body.DienThoai,
        email: req.body.email,
        password: hashedPassword, 
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const reader = await ReaderModel.create(readerData);
      
      res.json({ message: "Đăng ký thành công!", reader });
    } catch (err) {
      next(new ApiError(400, err.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const reader = await ReaderModel.findByEmail(email);
      if (!reader) throw new Error("Email không tồn tại!");
      const isMatch = await bcrypt.compare(password, reader.password);
      if (!isMatch) throw new Error("Sai mật khẩu!");
      const token = jwt.sign(
        {
          id: reader._id,
          name: reader.Ten,
          email: reader.email
        },
        "SECRET_KEY", 
        { expiresIn: "7d" }
      );

      res.json({ token, reader });
    } catch (err) {
      next(new ApiError(400, err.message));
    }
  }

  async getById(req, res, next) {
    try {
      const reader = await ReaderModel.findById(req.params.id);
      if (!reader) {
        return next(new ApiError(404, "Người mượn không tồn tại"));
      }
      res.json(reader);
    } catch (err) {
      next(new ApiError(500, "Lỗi server khi lấy người mượn"));
    }
  }
}

module.exports = new ReaderController();