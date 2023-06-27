import axios from "axios";

const api = axios.create({
  baseURL: "https://henrymoonapi.onrender.com",
});

export default api;
