// src/api/uploadApi.js
import axiosInstance from "./axiosInstance";

/**
 * 上传文件（默认上传图片）
 * @param {File} file 文件对象
 * @returns {Promise<{ url: string }>} 上传成功返回包含 url 的对象
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstance.post("/uploads", formData);
  return res.data;
};
