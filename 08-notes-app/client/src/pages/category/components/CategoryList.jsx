import React, { useState } from "react";
import { Divider, Tooltip, Dropdown, message } from "antd";
import dayjs from "dayjs";
import {
  BookFilled,
  CaretUpOutlined,
  CaretDownOutlined,
  PushpinOutlined,
  EllipsisOutlined,
  KeyOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import EditCategory from "@/pages/category/EditCategory";
import DeleteCategory from "@/pages/category/DeleteCategory";
import { updateCategory } from "@/api/categoryApi";

const CategoryList = ({ categories }) => {
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
    <div className="w-full">
      {/* 表头和顶部分割线 */}
      <div className="border-b border-gray-200 px-2">
        <div className="flex items-center justify-between text-gray-500">
          <div className="w-1/3 min-w-0 flex items-center ">
            <span className="pr-1">名称</span>
            <div className="flex flex-col  font-size-4 ">
              <Tooltip title={"点击升序"} arrow={false}>
                <CaretUpOutlined className="text-gray-500 hover:text-blue-500 " />
              </Tooltip>
              <Tooltip title={"点击降序"} placement="bottom" arrow={false}>
                <CaretDownOutlined className="text-gray-500 hover:text-blue-500 mt--1" />
              </Tooltip>
            </div>
          </div>
          <div className="w-1/3 min-w-0 text-left ">描述</div>
          <div className="w-1/3 flex items-center justify-end space-x-10">
            <span className="w-[140px] text-left flex items-center">
              <span className="pr-1">更新时间</span>
              <div className="flex flex-col  font-size-4 ">
                <Tooltip title={"点击升序"} arrow={false}>
                  <CaretUpOutlined className="text-gray-500 hover:text-blue-500 " />
                </Tooltip>
                <Tooltip title={"点击降序"} placement="bottom" arrow={false}>
                  <CaretDownOutlined className="text-gray-500 hover:text-blue-500 mt--1" />
                </Tooltip>
              </div>
            </span>
            <span className="w-6" />
            <span className="w-6" />
          </div>
        </div>
        <Divider className="mb-0 mt-2" />
      </div>

      {/* 列表内容 */}
      <div className="w-full">
        {categories.map((item) => (
          <div key={item.id} className="hover:bg-gray-100">
            <div className="flex items-center justify-between border-b border-gray-200 py-4 px-2">
              {/* 图标 + 标题 */}
              <div className="flex items-center space-x-2 w-1/3 min-w-0">
                <a
                  href={`/notes/categories/${item.id}`}
                  className="truncate text-base text-black no-underline hover:text-blue-600"
                >
                  <Tooltip title={"文档知识库"} arrow={false}>
                    <BookFilled
                      className="text-blue-500"
                      style={{ fontSize: "18px", flexShrink: 0 }}
                    />
                  </Tooltip>
                  <span className="ml-1 "> {item.name}</span>
                </a>
              </div>

              {/* 描述 */}
              <div className="text-sm text-gray-600 w-1/3 min-w-0 text-left">
                {item.description}
              </div>

              {/* 更新时间 + 按钮 */}
              <div className="flex items-center justify-end space-x-10 w-1/3">
                <span className="text-sm text-gray-500 w-[140px] ">
                  {dayjs
                    .utc(item.updated_at)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss")}
                </span>
                <Tooltip title="移出常用" arrow={false}>
                  <PushpinOutlined className="text-gray-500 cursor-pointer hover:text-blue-500" />
                </Tooltip>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        icon: <KeyOutlined />,
                        label: "权限",
                      },
                      {
                        key: "2",
                        icon: <EditOutlined />,
                        label: "编辑",
                        onClick: () => handleEdit(item),
                      },
                      {
                        key: "3",
                        icon: <SettingOutlined />,
                        label: "更多设置",
                      },
                      {
                        type: "divider",
                      },
                      {
                        key: "4",

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
                  <div className="bg-transparent hover:bg-gray-300 px-2 py-1 rounded-md">
                    <EllipsisOutlined
                      className="text-black cursor-pointer transition-colors duration-200"
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
            <Divider className="!my-0" />
          </div>
        ))}
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
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      updated_at: PropTypes.string,
    })
  ).isRequired,
};

export default CategoryList;
