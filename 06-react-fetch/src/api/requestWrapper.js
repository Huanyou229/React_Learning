// 封装的HTTP请求方法

// 封装GET请求
export const get = (request) => (url, params) => {
  return request({
    method: "get",
    url,
    params,
  });
};

// 封装POST请求
export const post = (request) => (url, data) => {
  return request({
    method: "post",
    url,
    data,
  });
};

// 封装PUT请求
export const update = (request) => (url, data) => {
  return request({
    method: "put",
    url,
    data,
  });
};

// 封装DELETE请求
export const del = (request) => (url) => {
  return request({
    method: "delete",
    url,
  });
};
