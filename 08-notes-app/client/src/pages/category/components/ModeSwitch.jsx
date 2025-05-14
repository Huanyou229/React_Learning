import React, { useState, useEffect } from "react";
import { Card, Segmented, Row, Col, Divider } from "antd";
import { getCategories } from "@/api/categoryApi";
import {
  BookFilled,
  LockOutlined,
  EditOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const ModeSwitch = () => {
  const [mode, setMode] = useState("grid"); // 默认模式为分组视图(grid)
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      <div className="flex justify-end">
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
        <Row gutter={20}>
          {categories.map((item) => (
            <Col key={item.id} span={8}>
              <Card
                hoverable
                style={{
                  width: 515,
                  height: 360,
                  marginTop: 15,
                  marginBottom: 10,
                }}
                cover={
                  <img
                    alt={item.name}
                    style={{ width: 515, height: 256 }}
                    src={
                      item.cover ||
                      "http://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/category-covers/1747209743241-hh.png"
                    }
                  />
                }
              >
                <div className="flex items-center ">
                  <BookFilled
                    style={{ color: "#679ff4", fontSize: "18px" }}
                    className="mr-2"
                  />
                  <span className="text-base font-medium">{item.name}</span>
                  <span className="text-gray-500 font-medium ml-sm">
                    <LockOutlined />
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
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
      )}
    </div>
  );
};

export default ModeSwitch;
