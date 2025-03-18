import React from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        color: isActive ? "#ff1493" : "#666",
        textDecoration: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        background: isActive ? "rgba(255, 192, 203, 0.3)" : "transparent",
        transition: "all 0.3s ease",
        ":hover": {
          background: "rgba(255, 192, 203, 0.2)",
        },
      }}
    >
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ paddingTop: "80px" }}></div>
      <nav
        style={{
          background: "rgba(255, 192, 203, 0.15)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: "0 4px 16px 0 rgba(255, 182, 193, 0.37)",
          border: "1px solid rgba(255, 192, 203, 0.3)",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            justifyContent: "center",
          }}
        >
          <li>
            <NavLink to="/">文章列表</NavLink>
          </li>
          <li>
            <NavLink to="/create">新建文章</NavLink>
          </li>
          <li>
            <NavLink to="/movies">电影列表</NavLink>
          </li>
        </ul>
      </nav>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
