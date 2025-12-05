import axios from "axios";

const API_URL = "http://localhost:3000/api/readers";

export default {
  getAll(params = {}) {
    return axios.get(API_URL, { params });
  },

  getOne(MaDG) {
    return axios.get(`${API_URL}/${MaDG}`);
  },

  create(data) {
    return axios.post(API_URL, data);
  },

  update(MaDG, data) {
    return axios.put(`${API_URL}/${MaDG}`, data);
  },

  delete(MaDG) {
    return axios.delete(`${API_URL}/${MaDG}`);
  }
};
