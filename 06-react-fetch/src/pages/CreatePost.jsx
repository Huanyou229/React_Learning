import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../api/request";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post("/posts", {
        title,
        body,
        image,
        author,
        date,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>新建文章</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            标题：
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="image"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            图片URL：
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="author"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            作者：
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="date"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            日期：
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="body"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            内容：
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{
              width: "100%",
              height: "300px",
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              resize: "vertical",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
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
            提交
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              backgroundColor: "#f1f3f4",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
