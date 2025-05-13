import React, { useState } from "react";
import { Card, Radio, Row, Col } from "antd";

const data = [
  {
    id: 1,
    title: "读书笔记",
    description: "读书笔记的描述",
    cover: "https://via.placeholder.com/200x150", // 示例封面图片URL
  },
  {
    id: 2,
    title: "英语",
    description: "英语学习的笔记",
    cover: "https://via.placeholder.com/200x150", // 示例封面图片URL
  },
  {
    id: 3,
    title: "资源/教程",
    description: "网络图片URL搜集分类",
    cover: "https://via.placeholder.com/200x150", // 示例封面图片URL
  },
  {
    id: 4,
    title: "项目",
    description: "项目相关的笔记",
    cover: "https://via.placeholder.com/200x150", // 示例封面图片URL
  },
];

const ModeSwitchExample = () => {
  const [mode, setMode] = useState("grid"); // 默认模式为分组视图(grid)

  return (
    <div>
      <Radio.Group
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        <Radio value="grid">分组视图</Radio>
        <Radio value="list">列表视图</Radio>
      </Radio.Group>

      {mode === "grid" ? (
        <Row gutter={16}>
          {data.map((item) => (
            <Col key={item.id} span={8}>
              <Card hoverable cover={<img alt={item.title} src={item.cover} />}>
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          {data.map((item) => (
            <Card key={item.id} bordered={false} style={{ marginBottom: 16 }}>
              <Card.Meta title={item.title} description={item.description} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModeSwitchExample;
