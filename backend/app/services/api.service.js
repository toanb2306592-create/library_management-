// app/services/api.service.js
import axios from "axios";

export default function createApiClient(baseURL = "/api") {
  return axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });
}
