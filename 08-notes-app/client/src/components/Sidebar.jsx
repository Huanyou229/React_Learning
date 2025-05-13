// Sidebar.jsx
import React, { useState, useEffect } from "react";
import {
  Menu,
  Button,
  Typography,
  Input,
  Dropdown,
  Modal,
  Avatar,
  Space,
  Tooltip,
  message,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OpenAIFilled,
  SignatureOutlined,
  StarOutlined,
  ProductOutlined,
  BookOutlined,
  BookFilled,
  ClockCircleOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  DownOutlined,
  BellOutlined,
  UserOutlined,
  LineChartOutlined,
  SunOutlined,
  SettingOutlined,
  LogoutOutlined,
  SelectOutlined,
  FileTextTwoTone,
  ProfileTwoTone,
  ReconciliationTwoTone,
  ProjectTwoTone,
  GoldTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { getCategories } from "@/api/categoryApi";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/userStore";
import CreateCategory from "@/pages/category/CreateCategory";

const Sidebar = () => {
  const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();

    // 监听知识库更新事件
    const handleCategoryUpdate = () => {
      fetchCategories();
    };
    window.addEventListener("categoryUpdated", handleCategoryUpdate);

    return () => {
      window.removeEventListener("categoryUpdated", handleCategoryUpdate);
    };
  }, []);

  const handleCreateClick = (key) => {
    if (!user) {
      message.warning("请先登录");
      navigate("/login");
      return;
    }
    if (key === "0") {
      navigate("/create-note");
    }
    // 其他 key 的逻辑可以根据需要补充
  };

  const handleNewCategory = () => {
    if (!user) {
      message.warning("请先登录");
      navigate("/login");
      return;
    }
    setCategoryFormOpen(true);
  };

  const items = [
    {
      key: "home",
      label: "开始",
      icon: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
      onClick: () => {
        navigate("/"); // 跳转到 home 页面
      },
    },
    {
      key: "ai",
      label: "AI写作",
      icon: <OpenAIFilled style={{ fontSize: "16px" }} />,
      onClick: () => {
        navigate("/ai"); // 跳转到 AI写作 页面
      },
    },
    {
      key: "sub4",
      label: "小计",
      icon: <SignatureOutlined style={{ fontSize: "16px" }} />,
    },
    {
      key: "sub5",
      label: "收藏",
      icon: <StarOutlined style={{ fontSize: "16px" }} />,
    },
    {
      key: "sub6",
      label: "逛逛",
      icon: <ProductOutlined style={{ fontSize: "16px" }} />,
    },
    {
      key: "sub7",
      label: "知识库",
      icon: <BookOutlined style={{ fontSize: "16px" }} />,
      className: "mt-4",
      onClick: () => {
        navigate("/categoryList");
      },
      children: categories.map((category) => ({
        key: category.id,
        label: (
          <div className="flex items-center">
            {category.name}
            <span className="text-gray-500 font-medium ml-sm">
              <LockOutlined />
            </span>
          </div>
        ),
        icon: <BookFilled style={{ color: "#1890ff", fontSize: "18px" }} />,

        // onClick: () => navigate(`/notes/categories/${category.id}`),
      })),
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const commonStyle = {
    minWidth: collapsed ? 48 : 256,
    backgroundColor: "#fafafa", // 默认使用亮色主题
    transition: "min-width 0.2s",
  };

  //   切换空间下拉框
  const menu1 = [
    {
      label: "个人",
      key: "0",
    },
    {
      label: "空间",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "创建空间",
      key: "3",
    },
  ];
  //   头像下拉框
  const menu2 = [
    {
      icon: <UserOutlined />,
      label: "个人中心",
      key: "0",
    },
    {
      type: "divider",
    },
    {
      icon: <SunOutlined />,
      label: "我的花园",
      key: "1",
    },
    { icon: <LineChartOutlined />, label: "创作中心", key: "2" },
    { icon: <SettingOutlined />, label: "设置", key: "3" },
    {
      type: "divider",
    },
    { icon: <LogoutOutlined />, label: "退出登录", key: "4" },
  ];
  //   新建下拉框
  const menu3 = [
    {
      icon: (
        <FileTextTwoTone twoToneColor="#3e90e3" style={{ fontSize: "16px" }} />
      ),
      label: "文档",
      key: "0",
      onClick: () => handleCreateClick("0"),
    },
    {
      icon: (
        <ProfileTwoTone twoToneColor="#63ca8c" style={{ fontSize: "16px" }} />
      ),
      label: "表格",
      key: "1",
    },
    {
      icon: (
        <ReconciliationTwoTone
          twoToneColor="#9177d9"
          style={{ fontSize: "16px" }}
        />
      ),
      label: "画板",
      key: "2",
    },
    {
      icon: (
        <ProjectTwoTone twoToneColor="#29bddb" style={{ fontSize: "16px" }} />
      ),
      label: "数据表",
      key: "3",
    },
    {
      type: "divider",
    },
    {
      icon: <BookFilled style={{ color: "#679ff4", fontSize: "16px" }} />,
      label: "知识库",
      key: "4",
      onClick: () => handleNewCategory(), // 新建知识库
    },
    {
      type: "divider",
    },
    {
      icon: <GoldTwoTone twoToneColor="#e4495b" style={{ fontSize: "16px" }} />,
      label: "从模版新建...",
      key: "5",
    },
    {
      icon: <OpenAIFilled style={{ fontSize: "16px", color: "#00b96b" }} />,
      label: "Ai帮你写",
      key: "6",
    },
    {
      icon: <SelectOutlined style={{ fontSize: "16px" }} />,
      label: "导入...",
      key: "7",
    },
  ];
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
  const { user, logout } = useStore();

  return (
    <>
      <CreateCategory
        open={categoryFormOpen}
        onCancel={() => setCategoryFormOpen(false)}
        onSuccess={() => {
          window.dispatchEvent(new Event("categoryUpdated"));
        }}
      />
      <div style={commonStyle}>
        <div style={commonStyle}>
          <div className="flex items-center justify-between pl-2 py-2 w-full">
            <div className="flex items-center">
              <img
                src="/yuque.svg"
                alt="羽雀"
                className="w-7 h-7"
                style={{ marginRight: collapsed ? 0 : "0.5rem" }}
              />
              {!collapsed && (
                <div className="flex items-center">
                  <Typography.Title
                    level={4}
                    className="m-0"
                    style={{ color: "#000" }}
                  >
                    羽雀
                  </Typography.Title>
                  <Dropdown menu={{ items: menu1 }} trigger={["hover"]}>
                    <span className="cursor-pointer">
                      <DownOutlined />
                    </span>
                  </Dropdown>
                </div>
              )}
            </div>
            {!collapsed && (
              <div className=" flex items-center px-2 mr-2">
                {/* 消息 */}
                <div className="mr-2">
                  <Tooltip title="消息中心" className="cursor-pointer">
                    <span>
                      <BellOutlined />
                    </span>
                  </Tooltip>
                </div>
                {/* 头像 */}
                <div>
                  {user ? (
                    <Space>
                      <Dropdown
                        menu={{
                          items: menu2,
                          onClick: ({ key }) => {
                            if (key === "4") {
                              handleLogout();
                            }
                          },
                        }}
                        trigger={["hover"]}
                        overlayStyle={{ padding: "10px 0", width: "180px" }}
                      >
                        <span style={{ cursor: "pointer" }}>
                          {user.avatar_url ? (
                            <Avatar src={user.avatar_url} />
                          ) : (
                            <Avatar icon={<UserOutlined />} />
                          )}
                        </span>
                      </Dropdown>
                    </Space>
                  ) : (
                    <Button type="primary" onClick={() => navigate("/login")}>
                      登录
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div
            className="flex items-center  gap-3 px-2"
            style={{ overflow: "hidden" }}
          >
            {!collapsed && (
              <div className="relative flex-1">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="w-full bg-gray-200 border-none rounded transition-colors"
                  placeholder="搜索"
                />
              </div>
            )}
            <Dropdown
              menu={{ items: menu3 }}
              trigger={["hover"]}
              overlayStyle={{ padding: "10px 0", width: "160px" }}
            >
              <span className="cursor-pointer">
                <PlusSquareOutlined className="text-2xl  hover:text-blue-600" />
              </span>
            </Dropdown>
          </div>
          <Menu
            onClick={onClick}
            style={commonStyle}
            defaultOpenKeys={["home"]}
            selectedKeys={[current]}
            mode="inline"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
