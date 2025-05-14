import React, { useState, useEffect } from "react";
import { getCategories } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import CollapsibleCategoryPanel from "@/pages/category/components/CollapsibleCategoryPanel";
import { Segmented, Empty, Affix, Button, Input } from "antd";
import ModeSwitch from "@/pages/category/components/ModeSwitch";
import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CreateCategory from "@/pages/category/CreateCategory"; // 确保已导入
const CategoryHome = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("我个人的");
  const [mode, setMode] = useState("grid");
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const fetchCategoriesData = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      alert("获取分类失败");
    }
  };

  useEffect(() => {
    fetchCategoriesData();

    // 添加监听
    const handleCategoryUpdate = () => {
      fetchCategoriesData();
    };

    window.addEventListener("categoryUpdated", handleCategoryUpdate);

    return () => {
      window.removeEventListener("categoryUpdated", handleCategoryUpdate);
    };
  }, []);

  const renderContent = () => {
    if (!user) {
      return <Empty description="请先登录" />;
    }
    switch (selected) {
      case "我个人的":
        return <ModeSwitch mode={mode} />;
      case "邀请协作的":
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
        <div className="text-2xl mb-6">知识库</div>
        <CollapsibleCategoryPanel title="常用" categories={categories} />
        <div className="flex justify-between items-center my-4">
          {/* 左侧：分类切换 */}
          <Segmented
            options={["我个人的", "邀请协作的"]}
            value={selected}
            onChange={setSelected}
            block
            style={{ backgroundColor: "#f5f5f5", borderRadius: 8, width: 190 }}
          />

          {/* 右侧：搜索 + 新建 + 视图切换，仅在“我个人的”时显示 */}
          {selected === "我个人的" && (
            <div className="flex items-center">
              <Input
                placeholder="搜索知识库"
                prefix={<SearchOutlined />}
                className="border border-gray-300 rounded-lg w-[170px] mr-2 h-[30px]"
              />
              <Button
                type="default"
                icon={<PlusOutlined />}
                onClick={() => setCategoryFormOpen(true)}
                className="border border-gray-300 rounded-lg p-2 mr-2"
              >
                新建知识库
              </Button>
              <Segmented
                value={mode}
                onChange={setMode}
                style={{ backgroundColor: "#f5f5f5" }}
                options={[
                  {
                    value: "grid",
                    icon: <AppstoreOutlined />,
                    title: "分组视图",
                  },
                  { value: "list", icon: <BarsOutlined />, title: "列表视图" },
                ]}
              />
            </div>
          )}
        </div>

        <div style={{ marginTop: 24 }}>{renderContent()}</div>
        <CreateCategory
          open={categoryFormOpen}
          onCancel={() => setCategoryFormOpen(false)}
          onSuccess={() => {
            window.dispatchEvent(new Event("categoryUpdated"));
          }}
        />
      </div>
    </div>
  );
};

export default CategoryHome;
