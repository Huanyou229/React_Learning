import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blog";
import { Card, Image, Typography, Space, Tag } from "antd";

const { Meta } = Card;
const { Text } = Typography;

// 定义颜色数组
const tagColors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];
  // 定义一个名为handleLogout的函数，用于处理退出登录操作

const BlogDetails = () => {
  const { id } = useParams(); // 使用 id 作为参数
  const blog = blogs[Number(id) - 1]; // 将 id 转换为数字并减 1

  // 使用 useMemo 缓存每个 tag 的颜色
  // 使用useMemo来缓存tagColorMap，只有当blog发生变化时才重新计算
  const tagColorMap = useMemo(() => {
    // 创建一个空对象map
    const map = {};
    // 如果blog存在且blog.tags存在
    if (blog && blog.tags) {
      // 遍历blog.tags
      blog.tags.forEach((tag) => {
        // 随机选择一个tagColors中的颜色，并将其赋值给map[tag]
        map[tag] = tagColors[Math.floor(Math.random() * tagColors.length)];
      });
    }
    // 返回map
    return map;
  }, [blog]);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        cover={
          <Image
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        }
        style={{ width: "100%", borderRadius: "12px" }}
        bordered={false}
      >
        <Meta
          title={blog.title}
          description={
            <Space direction="vertical" size="large">
              <Text>{blog.description}</Text>
              <Space>
                <Text strong>作者: {blog.author}</Text>
                <Text strong>阅读量: {blog.views}</Text>
                <Text strong>收藏数: {blog.favorites}</Text>
                <Text strong>点赞数: {blog.likes}</Text>
              </Space>
              <Space>
                {blog.tags.map((tag) => (
                  // 遍历blog.tags数组，将每个tag渲染为一个Tag组件
                  <Tag color={tagColorMap[tag]} key={tag}>
                    {tag}
                  </Tag>
                ))}
              </Space>
            </Space>
          }
        />
      </Card>
    </div>
  );
};

export default BlogDetails;
