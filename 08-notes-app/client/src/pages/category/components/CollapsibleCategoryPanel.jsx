// CollapsibleCategoryPanel.jsx
import React, { useState } from "react";
import { Card, Row, Col, Dropdown, message } from "antd";
import {
  BookFilled,
  DownOutlined,
  UpOutlined,
  EllipsisOutlined,
  SwapOutlined,
  KeyOutlined,
  EditOutlined,
  SettingOutlined,
  //   DeleteOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { updateCategory } from "@/api/categoryApi";
import PropTypes from "prop-types";
import EditCategory from "@/pages/category/EditCategory";
import DeleteCategory from "@/pages/category/DeleteCategory";

const CollapsibleCategoryPanel = ({ title, categories }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleEdit = (category) => {
    console.log("编辑点击了", category);
    setCurrentCategory(category);
    setEditModalVisible(true);
  };

  const handleDeleted = () => {
    window.dispatchEvent(new Event("categoryUpdated"));
  };

  CollapsibleCategoryPanel.propTypes = {
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <>
      <div className="w-full mb-6 border border-gray-200 rounded-md overflow-hidden shadow-sm">
        {/* 标题区域 */}
        <div
          className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
          onClick={toggleCollapse}
        >
          <div className="flex items-center">
            <span className="text-gray-500 font-medium">{title}</span>
          </div>
          <div className="flex items-center hover:text-blue-500 transition-colors duration-200">
            <span className="mr-1 text-xs text-gray-500">
              {collapsed ? "展开" : "收起"}
            </span>
            {collapsed ? (
              <DownOutlined style={{ fontSize: "12px", color: "#999" }} />
            ) : (
              <UpOutlined style={{ fontSize: "12px", color: "#999" }} />
            )}
          </div>
        </div>

        {/* 内容区域 */}
        {!collapsed && (
          <div className="p-4 bg-gray-50">
            <Row gutter={[16, 16]}>
              {categories.map((item) => (
                <Col key={item.id} xs={24} sm={12} md={8}>
                  <Card hoverable className="h-full shadow-sm">
                    <div className="flex items-center mb-2">
                      <BookFilled
                        style={{ fontSize: "22px" }}
                        className="mr-2 text-blue-500"
                      />
                      <div>
                        <span className="text-base font-medium">
                          {item.name}
                        </span>
                        <span className="text-gray-500 font-medium ml-sm">
                          <LockOutlined />
                        </span>
                        <div className="text-sm text-gray-500  overflow-hidden  text-ellipsis whitespace-nowrap w-100">
                          {item.description}
                        </div>
                      </div>
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
                                // icon: <DeleteOutlined />,
                                // 使用 DeleteCategory 组件
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
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>

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

export default CollapsibleCategoryPanel;
