import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { users } from "../data/userData";
import "../css/NavBar.css";

// 定义一个名为Login的函数组件
const Login = () => {
  // 使用useState钩子，定义一个名为loading的状态变量，初始值为false
  const [loading, setLoading] = useState(false);
  // 使用useNavigate钩子，定义一个名为navigate的变量，用于页面跳转
  const navigate = useNavigate();

  // 定义一个名为handleLogin的函数，用于处理登录逻辑
  const handleLogin = (values) => {
    // 设置loading为true，表示正在登录
    setLoading(true);
    // 使用setTimeout函数，模拟登录请求的延迟
    setTimeout(() => {
      // 在users数组中查找与输入的用户名和密码匹配的用户
      const user = users.find(
        (u) => u.nickname === values.username && u.password === values.password
      );

      // 如果找到了匹配的用户
      if (user) {
        // 将用户信息存储到localStorage中
        localStorage.setItem("user", JSON.stringify(user));
        // 弹出欢迎信息
        alert(`欢迎回来, ${user.nickname}!`);
        // 跳转到dashboard页面
        navigate("/dashboard");
      } else {
        // 如果没有找到匹配的用户，弹出错误信息
        alert("用户名或密码错误！");
      }
      // 设置loading为false，表示登录完成
      setLoading(false);
    }, 500);
  };

  // 返回登录页面的组件结构
  return (
    <div className="login-container">
      <Card title="用户登录" className="login-card">
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
