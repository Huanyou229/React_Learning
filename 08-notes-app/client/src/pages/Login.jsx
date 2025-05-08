import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Divider,
  Dropdown,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailFilled,
  AlipayCircleFilled,
  DingtalkCircleFilled,
  QqCircleFilled,
} from "@ant-design/icons";
import { loginUser } from "@/api/userApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const items = [
  {
    key: "1",
    label: "忘记密码?",
  },
];
const Login = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      setUser(response.data);
      message.success("登录成功");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("用户名或密码错误");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-150 mx-auto mt-20">
        <Title level={2} className="text-center mb-6">
          <img src="/yuque.svg" alt="羽雀" className="w-7 h-7 mr-1" />
          羽雀
        </Title>
        <Form name="login_form" onFinish={onSubmit} className="space-y-12">
          <Form.Item
            name="username"
            initialValue="huanyou"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="123456"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </Form.Item>
          <Button type="primary" className="w-full py-5" htmlType="submit">
            登录
          </Button>
        </Form>
        <div className="text-center mt-4">
          还没有账号？
          <a href="/register">去注册</a>
          <div className="mt-8">
            <Divider>其他登录方式</Divider>
            <div className="font-size-6 ">
              <QqCircleFilled style={{ color: "#038bc5" }} className="mr-3" />
              <DingtalkCircleFilled
                style={{ color: "#3795f9" }}
                className="mr-3"
              />
              <AlipayCircleFilled
                style={{ color: "#17a0e5" }}
                className="mr-3"
              />
              <MailFilled style={{ color: "#95a5b4" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-black-300">
        <Tooltip title="点此切换语言" placement="bottom">
          中文 / English
        </Tooltip>
        <Divider type="vertical" />
        <Dropdown menu={{ items }} placement="bottom">
          遇到问题
        </Dropdown>
      </div>
    </div>
  );
};

export default Login;
