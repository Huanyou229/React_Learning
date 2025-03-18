import axios from "axios";
import { handleAxiosError } from "./errorHandler";
import {
  get as getRequest,
  post as postRequest,
  update as updateRequest,
  del as delRequest,
} from "./requestWrapper";

// 创建axios实例
const request = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里可以添加loading状态
    // 添加token等通用header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use((response) => {
  // 统一处理响应数据
  return response.data;
}, handleAxiosError);

// 导出封装的请求方法
export const get = getRequest(request);
export const post = postRequest(request);
export const update = updateRequest(request);
export const del = delRequest(request);

// 导出request实例
export default request;
