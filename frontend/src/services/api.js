import axios from "axios";

const api = axios.create({
  baseURL: "https://knit-wmu1.onrender.com/api",
  withCredentials: true,
});

export default api;
