import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "http://43.142.252.113:3000/api", // 后端 API 的基础 URL
  withCredentials: true,
});

export default axiosInstance;
