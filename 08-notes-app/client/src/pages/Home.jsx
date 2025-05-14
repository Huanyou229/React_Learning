import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CreateCategory from "@/pages/category/CreateCategory";
import {
  FileTextTwoTone,
  GoldTwoTone,
  BookFilled,
  OpenAIFilled,
  DownOutlined,
  ProfileTwoTone,
  ReconciliationTwoTone,
  ProjectTwoTone,
  SelectOutlined,
} from "@ant-design/icons";
import { Card, Dropdown, message, Segmented, Empty, Affix } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/userStore";
import NoteList from "@/pages/note/NoteList";

const Home = () => {
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useStore();

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

  const menu = [
    {
      icon: (
        <FileTextTwoTone twoToneColor="#3e90e3" style={{ fontSize: "16px" }} />
      ),
      label: "新建文档",
      key: "0",
      style: { padding: "8px 16px" },
      onClick: () => handleCreateClick("0"),
    },
    {
      icon: (
        <ProfileTwoTone twoToneColor="#63ca8c" style={{ fontSize: "16px" }} />
      ),
      label: "新建表格",
      key: "1",
      style: { padding: "8px 16px" },
    },
    {
      icon: (
        <ReconciliationTwoTone
          twoToneColor="#9177d9"
          style={{ fontSize: "16px" }}
        />
      ),
      label: "新建画板",
      key: "2",
      style: { padding: "8px 16px" },
    },
    {
      icon: (
        <ProjectTwoTone twoToneColor="#29bddb" style={{ fontSize: "16px" }} />
      ),
      label: "新建数据表",
      key: "3",
      style: { padding: "8px 16px" },
    },
    {
      type: "divider",
    },
    {
      icon: <SelectOutlined style={{ fontSize: "16px" }} />,
      label: "导入...",
      key: "4",
      style: { padding: "8px 16px" },
    },
  ];
  const [selected, setSelected] = useState("编辑过");

  const renderContent = () => {
    if (!user) {
      return <Empty description="请先登录" />;
    }
    switch (selected) {
      case "编辑过":
        return <NoteList />;
      case "浏览过":
        return <NoteList />;
      case "我点赞的":
        return <Empty description="暂无数据" />;
      case "我评论过":
        return <Empty description="暂无数据" />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-row h-screen">
      <Affix offsetTop={0}>
        {/* 使用 Affix 组件固定 Sidebar */}
        <Sidebar />
      </Affix>
      <div className="flex-1 p-8">
        {/* 开始部分开始 */}
        <div className="text-2xl  mb-6">开始</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            hoverable
            className="backdrop-blur-lg bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <FileTextTwoTone
                  twoToneColor="#3e90e3"
                  style={{ fontSize: "20px" }}
                />
              </div>
              <div>
                <span className="text-base font-medium">新建文档</span>
                <p className="text-gray-500 text-sm text-left">
                  文档、表格、画板、数据表
                </p>
              </div>
              <div className="ml-auto">
                <Dropdown
                  menu={{ items: menu }}
                  trigger={["hover"]}
                  placement="bottom"
                  overlayStyle={{ padding: "10px 0", width: "200px" }}
                >
                  <span className="cursor-pointer">
                    <DownOutlined className="text-gray-400" />
                  </span>
                </Dropdown>
              </div>
            </div>
          </Card>

          <Card
            hoverable
            className="backdrop-blur-lg bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={handleNewCategory}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <BookFilled style={{ color: "#679ff4", fontSize: "20px" }} />
              </div>
              <div>
                <span className="text-base font-medium">新建知识库</span>
                <p className="text-gray-500 text-sm text-left">
                  使用知识库整理知识
                </p>
              </div>
            </div>
          </Card>

          <CreateCategory
            open={categoryFormOpen}
            onCancel={() => setCategoryFormOpen(false)}
            onSuccess={() => {
              window.dispatchEvent(new Event("categoryUpdated"));
            }}
          />

          <Card
            hoverable
            className="backdrop-blur-lg bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <GoldTwoTone
                  twoToneColor="#e4495b"
                  style={{ fontSize: "20px" }}
                />
              </div>
              <div>
                <span className="text-base font-medium">模版中心</span>
                <p className="text-gray-500 text-sm text-left">
                  从模版中获取灵感
                </p>
              </div>
            </div>
          </Card>

          <Card
            hoverable
            className="backdrop-blur-lg bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <OpenAIFilled style={{ color: "#00b96b", fontSize: "20px" }} />
              </div>
              <div>
                <span className="text-base font-medium">AI帮你写</span>
                <p className="text-gray-500 text-sm text-left">
                  AI助手帮你一键生成文档
                </p>
              </div>
            </div>
          </Card>
        </div>
        {/* 开始部分结束 */}

        {/* 文档部分开始 */}
        <div className="text-2xl  my-6">文档</div>

        <Segmented
          options={["编辑过", "浏览过", "我点赞的", "我评论过"]}
          value={selected}
          onChange={setSelected}
          block
          style={{ backgroundColor: "#f5f5f5", borderRadius: 8, width: 324 }}
        />
        <div style={{ marginTop: 24 }}>{renderContent()}</div>
        {/* 文档部分结束 */}
      </div>
    </div>
  );
};
export default Home;
