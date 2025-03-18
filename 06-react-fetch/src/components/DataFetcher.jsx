import { useState, useEffect } from "react";

// 创建DataFetcher组件，用于获取和展示数据
const DataFetcher = () => {
  // 使用useState钩子管理数据状态
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用useEffect钩子在组件挂载时获取数据
  useEffect(() => {
    // 定义异步函数fetchData用于获取数据
    const fetchData = async () => {
      try {
        // 使用fetch API发起GET请求
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        // 检查响应状态
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 解析JSON响应数据
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
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
      <h2>文章列表</h2>
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

export default DataFetcher;
