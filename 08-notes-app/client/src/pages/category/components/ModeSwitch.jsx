import React, { useState, useEffect } from "react";
import {
  // Card,
  Segmented,
  // Row,
  // Col,
  // Divider,
  Input,
  Button,
  message,
} from "antd";
import { getCategories } from "@/api/categoryApi";
import {
  // BookFilled,
  // LockOutlined,
  // EditOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CreateCategory from "@/pages/category/CreateCategory";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/userStore";
import CategoryGroup from "./CategoryGroup";
import CategoryList from "./CategoryList";

dayjs.extend(utc);
const ModeSwitch = () => {
  const [mode, setMode] = useState("grid"); // 默认模式为分组视图(grid)
  const [categories, setCategories] = useState([]);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useStore();

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
  }, []);
  const handleNewCategory = () => {
    if (!user) {
      message.warning("请先登录");
      navigate("/login");
      return;
    }
    setCategoryFormOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Input
          placeholder="搜索知识库"
          prefix={<SearchOutlined />}
          className="border border-gray-300 rounded-lg  w-[170px] mr-2 h-[30px]"
          // onPressEnter={handleSearch}
        />
        <Button
          type="default"
          icon={<PlusOutlined />}
          onClick={handleNewCategory}
          className="border border-gray-300 rounded-lg p-2 mr-2"
        >
          新建知识库
        </Button>
        <CreateCategory
          open={categoryFormOpen}
          onCancel={() => setCategoryFormOpen(false)}
          onSuccess={() => {
            window.dispatchEvent(new Event("categoryUpdated"));
          }}
        />
        <Segmented
          value={mode}
          onChange={(val) => setMode(val)}
          style={{ marginBottom: 16 }}
          options={[
            { value: "grid", icon: <AppstoreOutlined />, title: "分组视图" },
            { value: "list", icon: <BarsOutlined />, title: "列表视图" },
          ]}
        />
      </div>

      {mode === "grid" ? (
        <CategoryGroup categories={categories} />
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
};

export default ModeSwitch;
