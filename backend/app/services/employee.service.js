// app/services/employee.service.js
const { ObjectId } = require("mongodb");

class EmployeeService {
  constructor(client) {
    this.Employee = client.db("libraryDB").collection("employees");
  }

  // Lấy danh sách nhân viên, filter là object MongoDB
  async find(filter = {}) {
    return await this.Employee.find(filter).toArray();
  }

  // Lấy 1 nhân viên theo ID
  async findById(id) {
    return await this.Employee.findOne({ _id: new ObjectId(id) });
  }

  // Tạo nhân viên mới
  async create(data) {
    // Bạn có thể thêm validate dữ liệu tại đây
    const result = await this.Employee.insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  // Cập nhật nhân viên theo ID
  async update(id, data) {
    const result = await this.Employee.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result.modifiedCount > 0;
  }

  // Xóa 1 nhân viên theo ID
  async delete(id) {
    const result = await this.Employee.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Xóa tất cả nhân viên
  async deleteAll() {
    const result = await this.Employee.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = EmployeeService;
