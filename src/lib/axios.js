import axios from "axios";

const api = axios.create({
  baseURL: "https://henrymoon.onrender.com",
});

export default api;
