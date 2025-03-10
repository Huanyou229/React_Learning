import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Menu, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "../App.css";
import "../css/NavBar.css";
import "../css/my.css";
// 导出一个名为NavBar的函数组件
const NavBar = () => {
  // 使用useState钩子创建一个名为user的状态变量，初始值为null
  const [user, setUser] = useState(null);
  // 使用useNavigate钩子创建一个名为navigate的函数，用于导航到指定路径
  const navigate = useNavigate();

  // 使用useEffect钩子，在组件挂载时执行一次，获取本地存储中的用户信息，并将其设置为user状态变量的值
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  // 定义一个名为menu的变量，值为一个Menu组件
  const menu = (
    // 创建一个Menu组件，并设置其className为"user-menu"
    <Menu className="user-menu">
      <Menu.Item key="nickname" disabled className="user-nickname">
        <Avatar size={50} src={user?.avatar} icon={<UserOutlined />} />
        <Typography.Text strong className="user-name">
          {user?.nickname || "未登录"}
        </Typography.Text>
      </Menu.Item>

      <Menu.Divider className="user-divider" />

      <Menu.Item key="phone" className="user-info">
        📞 {user?.phone || "未绑定"}
      </Menu.Item>
      <Menu.Item key="signature" className="user-info">
        ✍️ {user?.signature || "这个人很神秘"}
      </Menu.Item>

      <Menu.Divider className="user-divider" />

      <Menu.Item key="logout" onClick={handleLogout} className="logout-btn">
        <LogoutOutlined className="logout-icon" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/about?name=John&age=30" activeClassName="active">
          About
        </NavLink>
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/book/123" activeClassName="active">
          Book
        </NavLink>
      </div>
      {user ? (
        // 如果用户已登录，则显示用户头像
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar src={user.avatar} size="large" className="user-avatar" />
        </Dropdown>
      ) : (
        // 如果用户未登录，则显示登录链接
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
