import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get, del } from "../api/request";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get("/posts");
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  const handleDelete = async (id) => {
    try {
      await del(`/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {currentPosts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              ":hover": { transform: "translateY(-4px)" },
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  color: "#202124",
                }}
              >
                {post.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span style={{ color: "#5f6368", fontSize: "14px" }}>
                  {post.author}
                </span>
                <span style={{ color: "#5f6368", fontSize: "14px" }}>
                  {post.date}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#3c4043",
                  fontSize: "14px",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.body}
              </p>
              <button
                onClick={() => handleDelete(post.id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                删除
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: currentPage === 1 ? "#f1f3f4" : "#1a73e8",
            color: currentPage === 1 ? "#5f6368" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "default" : "pointer",
          }}
        >
          上一页
        </button>
        <span
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            color: "#5f6368",
          }}
        >
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: currentPage === totalPages ? "#f1f3f4" : "#1a73e8",
            color: currentPage === totalPages ? "#5f6368" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "default" : "pointer",
          }}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default PostList;
