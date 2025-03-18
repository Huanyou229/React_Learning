import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieList } from "../api/movieApi";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovieList(24);
        if (!data || !data.result || !data.result.newslist) {
          throw new Error("获取电影列表数据格式错误");
        }
        setAllMovies(data.result.newslist);
        setTotalPages(Math.ceil(data.result.newslist.length / itemsPerPage));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setMovies(allMovies.slice(startIndex, endIndex));
  }, [currentPage, allMovies]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "20px",
          marginBottom: "10px",
          minHeight: "600px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              background: "rgba(255, 192, 203, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "10px 10px 0px 10px",
              boxShadow: "0 8px 32px 0 rgba(255, 182, 193, 0.37)",
              border: "1px solid rgba(255, 192, 203, 0.3)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              marginBottom: "30px",
            }}
          >
            <img
              src={movie.picUrl}
              alt={movie.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
                marginBottom: "12px",
              }}
            />
            <h3
              style={{
                marginBottom: "8px",
                color: "#333",
                fontSize: "1.1em",
                fontWeight: "600",
              }}
            >
              {movie.title}
            </h3>
            <p
              style={{
                color: "#666",
                marginBottom: "10px",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "0.9em",
                lineHeight: "1.4",
                height: "2.8em",
              }}
            >
              {movie.description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
                fontSize: "0.85em",
                color: "#888",
              }}
            >
              <span>{movie.source}</span>
              <span>{movie.ctime}</span>
            </div>

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{
                background: "rgba(255, 105, 180, 0.7)",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "rgba(255, 20, 147, 0.8)")
              }
            >
              查看详情
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: currentPage === 1 ? "#ccc" : "rgba(255, 105, 180, 0.7)",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          上一页
        </button>
        <span style={{ padding: "8px 16px" }}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background:
              currentPage === totalPages ? "#ccc" : "rgba(255, 105, 180, 0.7)",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default MovieList;
