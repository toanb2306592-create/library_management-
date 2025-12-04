const ReaderModel = require("../models/reader.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ReaderService {

  async register(data) {
    const exists = await ReaderModel.findByEmail(data.email);
    if (exists) {
      throw new Error("Email đã được sử dụng!");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const readerData = {
      HoLot: data.HoLot,
      Ten: data.Ten,
      NgaySinh: data.NgaySinh,
      Phai: data.Phai,
      DiaChi: data.DiaChi,
      DienThoai: data.DienThoai,
      email: data.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await ReaderModel.create(readerData);
  }

  async login({ email, password }) {
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

    return { token, reader };
  }
}

module.exports = new ReaderService();
