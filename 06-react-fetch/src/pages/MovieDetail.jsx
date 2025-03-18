import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movieApi";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const data = await getMovieDetail(id);
        setMovie(data.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!movie) return <div>未找到电影信息</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        height: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          display: "flex",
          gap: "30px",
        }}
      >
        {/* 左侧图片区域 */}
        <div style={{ flex: "0 0 350px" }}>
          <img
            src={movie.picUrl}
            alt={movie.title}
            style={{
              width: "100%",
              height: "450px",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* 右侧内容区域 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              color: "#ff1493",
              marginBottom: "20px",
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            {movie.title}
          </h1>

          <p
            style={{
              color: "#666",
              lineHeight: "1.8",
              marginBottom: "20px",
              flex: 1,
            }}
          >
            {movie.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#666",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            <span>{movie.ctime}</span>
            <span>{movie.source}</span>
          </div>

          <button
            onClick={() => window.open(movie.url, "_blank")}
            style={{
              background: "rgba(255, 105, 180, 0.7)",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: "500",
              alignSelf: "flex-start",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "rgba(255, 20, 147, 0.8)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "rgba(255, 105, 180, 0.7)")
            }
          >
            查看原文
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
