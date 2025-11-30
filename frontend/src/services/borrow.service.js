import axios from "axios";

const API_URL = "http://localhost:3000/api/borrows";

export default {
  // Lấy danh sách mượn sách, có thể filter theo MaDG, MaSach, NgayMuon
  getAll(params = {}) {
    return axios.get(API_URL, { params });
  },

  // Lấy 1 bản ghi mượn theo khóa chính (MaDG + MaSach + NgayMuon)
  getOne(MaDG, MaSach, NgayMuon) {
    return axios.get(`${API_URL}/${MaDG}/${MaSach}/${NgayMuon}`);
  },

  // Tạo bản ghi mượn sách mới
  create(data) {
    return axios.post(API_URL, data);
  },

  // Cập nhật ngày trả
  update(MaDG, MaSach, NgayMuon, data) {
    return axios.put(`${API_URL}/${MaDG}/${MaSach}/${NgayMuon}`, data);
  },

  // Xóa bản ghi mượn sách
  delete(MaDG, MaSach, NgayMuon) {
    return axios.delete(`${API_URL}/${MaDG}/${MaSach}/${NgayMuon}`);
  }
};
