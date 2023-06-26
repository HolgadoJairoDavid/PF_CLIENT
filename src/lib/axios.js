import axios from "axios";

const api = axios.create({
  baseURL: "https://pfapi-production.up.railway.app/",
});

export default api;
