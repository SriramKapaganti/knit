import axios from "axios";

const api = axios.create({
  baseURL: "https://knit-wmu1.onrender.com/api",
  withCredentials: true,
});

// Auth APIs
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const logout = () => api.post("/auth/logout");
export const profile = () => api.get("/auth/profile");

// Task APIs
export const getTasks = () => api.get("/tasks");
export const addTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
