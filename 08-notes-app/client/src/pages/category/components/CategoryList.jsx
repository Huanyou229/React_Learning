import React from "react";
import { Divider } from "antd";
import dayjs from "dayjs";
import { EditOutlined, BookFilled } from "@ant-design/icons";
import PropTypes from "prop-types";

const CategoryList = ({ categories }) => {
  return (
    <div className="w-full">
      {/* 表头和顶部分割线 */}
      <div className="border-b border-gray-200 px-2">
        <div className="flex items-center justify-between text-gray-500">
          <div className="w-1/3 min-w-0">名称</div>
          <div className="w-1/3 min-w-0 text-left">描述</div>
          <div className="w-1/3 flex items-center justify-end space-x-10">
            <span className="w-[140px] text-left">更新时间</span>
            <span className="w-5" />
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
                <BookFilled
                  className="text-blue-500"
                  style={{ fontSize: "18px", flexShrink: 0 }}
                />
                <a
                  href={`/notes/${item.id}`}
                  className="truncate text-base text-black no-underline hover:text-blue-600"
                >
                  {item.name}
                </a>
              </div>

              {/* 描述 */}
              <div className="text-sm text-gray-600 w-1/3 min-w-0 text-left">
                {item.description}
              </div>

              {/* 更新时间 + 编辑按钮 */}
              <div className="flex items-center justify-end space-x-10 w-1/3">
                <span className="text-sm text-gray-500 w-[140px] ">
                  {dayjs
                    .utc(item.updated_at)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss")}
                </span>
                <EditOutlined className="text-gray-500 cursor-pointer hover:text-blue-500" />
              </div>
            </div>
            <Divider className="!my-0" />
          </div>
        ))}
      </div>
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
