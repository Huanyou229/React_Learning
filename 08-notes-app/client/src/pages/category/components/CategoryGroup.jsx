import React, { useState } from "react";
import { Card, Row, Col, Dropdown, message } from "antd";
import {
  BookFilled,
  LockOutlined,
  SwapOutlined,
  KeyOutlined,
  EditOutlined,
  SettingOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { updateCategory } from "@/api/categoryApi";
import EditCategory from "@/pages/category/EditCategory";
import DeleteCategory from "@/pages/category/DeleteCategory";

const CategoryGroup = ({ categories }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const handleEdit = (category) => {
    console.log("编辑点击了", category);
    setCurrentCategory(category);
    setEditModalVisible(true);
  };

  const handleDeleted = () => {
    window.dispatchEvent(new Event("categoryUpdated"));
  };
  return (
    <>
      {" "}
      <Row gutter={24}>
        {categories.map((item) => (
          <Col key={item.id} span={8}>
            <Card
              hoverable
              style={{
                width: 450,
                height: 310,
                marginTop: 15,
                marginBottom: 10,
              }}
              cover={
                <img
                  alt={item.name}
                  style={{ width: 450, height: 220 }}
                  src={
                    item.cover ||
                    "http://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/category-covers/1747209743241-hh.png"
                  }
                />
              }
            >
              <div className="flex items-center">
                <a
                  href={`/notes/categories/${item.id}`}
                  className="truncate text-base text-black no-underline hover:text-blue-600"
                >
                  <BookFilled
                    style={{ fontSize: "18px" }}
                    className="mr-2 text-blue-500"
                  />
                  <span className="text-base font-medium">{item.name}</span>
                  <span className="text-gray-500 font-medium ml-2">
                    <LockOutlined />
                  </span>
                </a>
                <div className="ml-auto">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "1",
                          icon: <SwapOutlined />,
                          label: "移出常用",
                        },
                        {
                          type: "divider",
                        },
                        {
                          key: "2",
                          icon: <KeyOutlined />,
                          label: "权限",
                        },
                        {
                          key: "3",
                          icon: <EditOutlined />,
                          label: "编辑",
                          onClick: () => handleEdit(item),
                        },
                        {
                          key: "4",
                          icon: <SettingOutlined />,
                          label: "更多设置",
                        },
                        {
                          type: "divider",
                        },
                        {
                          key: "5",
                          label: (
                            <DeleteCategory
                              category={item}
                              onDeleted={handleDeleted}
                            />
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <EllipsisOutlined
                      className="text-gray-400 cursor-pointer hover:text-blue-500 transition-colors duration-200"
                      style={{ fontSize: "16px" }}
                    />
                  </Dropdown>
                </div>
              </div>
              <div className="w-80 text-sm text-gray-500 mt-2 truncate">
                {item.description}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {/* 模态框 */}
      <EditCategory
        visible={editModalVisible}
        category={currentCategory}
        onCancel={() => setEditModalVisible(false)}
        onConfirm={async (updated) => {
          try {
            await updateCategory(updated.id, updated); // ✅ 传完整数据
            message.success("知识库已更新");
            setEditModalVisible(false);
            window.dispatchEvent(new Event("categoryUpdated"));
          } catch (error) {
            console.error("更新失败", error);
            message.error("更新失败");
          }
        }}
      />
    </>
  );
};

CategoryGroup.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cover: PropTypes.string,
    })
  ).isRequired,
};

export default CategoryGroup;
