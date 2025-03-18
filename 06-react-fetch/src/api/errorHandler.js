// 统一错误处理
export const handleAxiosError = (error) => {
  let message = "";
  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = "请求错误";
        break;
      case 401:
        message = "未授权";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址不存在";
        break;
      case 500:
        message = "服务器内部错误";
        break;
      default:
        message = "网络错误";
    }
  } else {
    message = error.message;
  }
  console.error("请求错误:", message);
  return Promise.reject(error);
};
