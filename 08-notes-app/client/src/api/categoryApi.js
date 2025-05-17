import axiosInstance from "./axiosInstance";

// 创建分类
export const createCategory = async (categoryData) => {
  return axiosInstance.post("/categories", categoryData);
};

// 获取分类列表
export const getCategories = async (userId) => {
  return axiosInstance.get(`/categories/user/${userId}`);
};

// 获取单个分类
export const getCategory = async (categoryId) => {
  return axiosInstance.get(`/categories/${categoryId}`);
};

// 更新分类
export const updateCategory = async (categoryId, categoryData) => {
  return axiosInstance.put(`/categories/${categoryId}`, categoryData);
};

export const deleteCategory = async (categoryId) => {
  return axiosInstance.delete(`/categories/${categoryId}`);
};
