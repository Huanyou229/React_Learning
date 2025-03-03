import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../css/Login.css"; // 引入外部样式文件

const Login = () => {
  const { user, login, logout } = useContext(UserContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">用户登录</h1>
      {user ? (
        <div>
          <p className="login-input" style={{ color: "#ff69b4" }}>
            用户 {user} 已登录
          </p>
          <button className="login-button" onClick={logout}>
            登出
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用户名"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
            className="login-input"
          />
          <button type="submit" className="login-button">
            登录
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
