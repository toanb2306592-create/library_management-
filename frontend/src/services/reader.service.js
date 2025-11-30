import axios from "axios";

const API_URL = "http://localhost:3000/api/readers";

export default {
  // Lấy tất cả đọc giả hoặc filter theo MaDG / tên
  getAll(params = {}) {
    return axios.get(API_URL, { params });
  },

  // Lấy 1 đọc giả theo MaDG
  getOne(MaDG) {
    return axios.get(`${API_URL}/${MaDG}`);
  },

  // Tạo đọc giả mới
  create(data) {
    return axios.post(API_URL, data);
  },

  // Cập nhật đọc giả
  update(MaDG, data) {
    return axios.put(`${API_URL}/${MaDG}`, data);
  },

  // Xóa đọc giả
  delete(MaDG) {
    return axios.delete(`${API_URL}/${MaDG}`);
  }
};
