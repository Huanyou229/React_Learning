import { useState, useEffect } from "react";
// ⾃定义 Hook：useFetch，该 Hook ⽤于从指定的 URL 获取数据，并管理加载状态和错误信 息
function useFetch(url) {
  // 使⽤ useState Hook 创建三个状态变量：
  // data ⽤于存储获取的数据；loading ⽤于表示数据是否正在加载中；error ⽤于存储可能 发⽣的错误信息
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 使⽤ useEffect Hook 来处理副作⽤操作，如数据获取
  useEffect(() => {
    // 定义⼀个异步函数 fetchData ⽤于获取数据
    const fetchData = async () => {
      try {
        // 发起 fetch 请求，等待响应
        const response = await fetch(url);
        // 检查响应是否成功
        if (!response.ok) {
          // 如果响应状态码不是 2xx，抛出错误
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 解析响应为 JSON 格式，并更新 data 状态
        const result = await response.json();
        setData(result);
      } catch (err) {
        // 如果请求过程中发⽣错误，更新 error 状态
        setError(err.message);
      } finally {
        // 不管请求成功还是失败，都将 loading 状态设置为 false
        setLoading(false);
      }
    };
    // 调⽤ fetchData 函数开始获取数据
    fetchData();
  }, [url]); // 依赖数组，只有当 url 发⽣变化时，才会重新执⾏ effect
  // 返回获取到的数据以及加载状态和错误信息，这样使⽤该 Hook 的组件就可以根据这些信息渲 染 UI
  return { data, loading, error };
}
export default useFetch;
