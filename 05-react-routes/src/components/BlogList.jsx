import React, { useState } from "react";
import { List, Card, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import blogs from "../data/blog";

const { Meta } = Card;

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 每页显示的博客数量

  // 分页数据
  const startIndex = (currentPage - 1) * pageSize;
  const currentBlogs = blogs.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(blogs.length / pageSize);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Blog List</h2>

      <List
        itemLayout="horizontal"
        dataSource={currentBlogs}
        renderItem={(blog) => (
          <List.Item key={blog.id} style={{ borderBottom: "none" }}>
            <Card hoverable style={{ width: "100%", marginBottom: 16 }}>
              <Meta
                avatar={<Avatar size="large" src={blog.image} />}
                title={<Link to={`/blog/${blog.id}`}>{blog.title}</Link>}
                description={blog.description}
              />
            </Card>
          </List.Item>
        )}
        split={false} // 去除列表项之间的分割线
      />

      {/* 分页按钮组 */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="primary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: 8 }}
        >
          上一页
        </Button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <Button
          type="primary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: 8 }}
        >
          下一页
        </Button>
      </div>
    </div>
  );
};

export default BlogList;
