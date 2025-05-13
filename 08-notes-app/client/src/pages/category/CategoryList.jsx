import React, { useState, useEffect } from "react";
import { getCategories } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ModeSwitchExample from "@/pages/category/components/ModeSwitchExample";
import CollapsibleCategoryPanel from "@/pages/category/components/CollapsibleCategoryPanel";

const CategoryList = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="text-2xl mb-6">知识库</div>
        <CollapsibleCategoryPanel title="常用" categories={categories} />
        <ModeSwitchExample />
      </div>
    </div>
  );
};

export default CategoryList;
