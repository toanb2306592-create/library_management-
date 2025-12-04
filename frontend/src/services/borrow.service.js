import axios from "axios";

class BorrowService {
  async getAll(params = {}) {
    return axios.get("http://localhost:3000/api/borrows", { params });
  }

  async create(data) {
    return axios.post("http://localhost:3000/api/borrows", data);
  }

  async confirm(id, approve = true) {
    return axios.patch(`http://localhost:3000/api/borrows/${id}/${approve ? "confirm" : "reject"}`);
  }

  async returnBook(id, NgayTra) {
    return axios.put(`http://localhost:3000/api/borrows/return/${id}`, { NgayTra });
  }

  async delete(id) {
    return axios.delete(`http://localhost:3000/api/borrows/${id}`);
  }
}

export default new BorrowService();
