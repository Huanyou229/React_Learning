import React, { useState, useEffect } from "react";
import { List, Card } from "antd";
import { getCategories } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
const CategoryList = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        alert("获取分类失败");
      }
    };
    fetchCategoriesData();
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={categories}
          renderItem={(item) => (
            <Card hoverable className="m-2">
              <Card.Meta title={item.name} />
              <a href={`/notes/categories/${item.id}`}>查看分类笔记</a>
            </Card>
          )}
        />
      </div>
    </div>
  );
};

export default CategoryList;
