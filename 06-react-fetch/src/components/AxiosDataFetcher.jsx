import { useState, useEffect } from "react";
import axios from "axios";

// 创建AxiosDataFetcher组件，使用axios获取和展示数据
const AxiosDataFetcher = () => {
  // 使用useState钩子管理数据状态
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用useEffect钩子在组件挂载时获取数据
  useEffect(() => {
    // 定义异步函数fetchData用于获取数据
    const fetchData = async () => {
      try {
        // 使用axios发起GET请求
        // axios会自动将响应数据转换为JSON格式
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: 5, // 限制获取5条数据
            },
          }
        );

        // axios的数据在response.data中
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        // axios会自动处理非200响应码，将错误信息放在err.message中
        setError(err.message);
        setLoading(false);
      }
    };

    // 调用fetchData函数
    fetchData();
  }, []); // 空依赖数组表示仅在组件挂载时执行一次

  // 根据不同状态渲染不同内容
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>文章列表 (Axios版本)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosDataFetcher;
