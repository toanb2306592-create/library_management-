import axios from "axios";
const API = "http://localhost:3000/api/publishers";

export default {
  getAll() {
    return axios.get(API);
  },
  create(data) {
    return axios.post(API, data);
  }
};
