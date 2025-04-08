import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Typography, Avatar, Space, Button, Modal } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";

import { useStore } from "@/store/userStore";

const { Header } = Layout;
const { Text } = Typography;
const Navbar = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Modal.confirm({
      title: "确定退出",
      content: "确定要退出登录吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        await logout();
        navigate("/login");
      },
    });
  };

  const selectedKeys = React.useMemo(() => {
    switch (location.pathname) {
      case "/":
        return ["home"];
      case "/categories":
        return ["categories"];
      case "/notes":
        return ["notes"];
      default:
        return [];
    }
  });

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal
      "
        selectedKeys={selectedKeys}
        className="w-200"
        items={[
          {
            key: "home",
            label: (
              <Space size="middle">
                <HomeOutlined />
                <span>首页</span>
              </Space>
            ),
            onClick: () => navigate("/"),
          },
          {
            key: "categories",
            label: (
              <Space size="middle">
                <HomeOutlined />
                <span>分类</span>
              </Space>
            ),
            onClick: () => navigate("/categories"),
          },
          {
            key: "notes",
            label: (
              <Space size="middle">
                <HomeOutlined />
                <span>笔记</span>
              </Space>
            ),
            onClick: () => navigate("/notes"),
          },
        ]}
      />
      <div>
        {user ? (
          <Space onClick={handleLogout}>
            {user.avatar_url ? (
              <Avatar src={user.avatar_url} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
            <Text className="ml-2 text-white">
              {user.nickname || user.username}
            </Text>
          </Space>
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>
            登录
          </Button>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
