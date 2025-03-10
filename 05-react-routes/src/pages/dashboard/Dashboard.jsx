import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../APP.css";

const Dashboard = () => {
  const [nickname, setNickname] = useState(""); // ✅ 存储用户名
  const navigate = useNavigate();

  useEffect(() => {
    // 从 localStorage 获取用户信息
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setNickname(user.nickname);
    } else {
      navigate("/login"); // ✅ 未登录时重定向到登录页
    }
  }, [navigate]);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      <h3>Welcome {nickname}!</h3>
      <nav>
        <NavLink to="profile" activeClassName="dashboard">
          profile
        </NavLink>
        <NavLink to="setting" activeClassName="dashboard">
          setting
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
