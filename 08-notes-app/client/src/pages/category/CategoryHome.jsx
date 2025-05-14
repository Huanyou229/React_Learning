import React, { useState, useEffect } from "react";
import { getCategories } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import CollapsibleCategoryPanel from "@/pages/category/components/CollapsibleCategoryPanel";
import { Segmented, Empty, Affix } from "antd";
import ModeSwitch from "@/pages/category/components/ModeSwitch";
const CategoryHome = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("我个人的");
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
        return <ModeSwitch />;
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
        <Segmented
          options={["我个人的", "邀请协作的"]}
          value={selected}
          onChange={setSelected}
          block
          style={{ backgroundColor: "#f5f5f5", borderRadius: 8, width: 190 }}
        />
        <div style={{ marginTop: 24 }}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default CategoryHome;
