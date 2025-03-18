import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { get } from "../api/request";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await get(`/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!post) return <div>文章不存在</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#f1f3f4",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          返回列表
        </button>
        <button
          onClick={() => navigate(`/edit/${id}`)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          编辑文章
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ height: "100%" }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <h1 style={{ marginTop: 0, marginBottom: "16px", color: "#202124" }}>
            {post.title}
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              color: "#5f6368",
              fontSize: "14px",
            }}
          >
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "#3c4043",
              whiteSpace: "pre-wrap",
            }}
          >
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
