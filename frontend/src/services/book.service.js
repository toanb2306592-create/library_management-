import axios from "axios";

const API_URL = "http://localhost:3000/api/books"; // URL backend

class BookService {
  // Lấy danh sách sách, có thể filter theo TenSach hoặc MaNXB
  getAll(params = {}) {
    return axios.get(API_URL, { params });
  }

  // Lấy 1 sách theo id
  getOne(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // Tạo sách mới
  create(data) {
    return axios.post(API_URL, data);
  }

  // Cập nhật sách
  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  // Xóa sách
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

   get(id) {         
    return axios.get(`${API_URL}/${id}`);
  }

}

export default new BookService();
