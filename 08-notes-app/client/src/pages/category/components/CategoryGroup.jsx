import React from "react";
import { Card, Row, Col } from "antd";
import { BookFilled, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const CategoryGroup = ({ categories }) => {
  return (
    <Row gutter={20}>
      {categories.map((item) => (
        <Col key={item.id} span={8}>
          <a
            href={`/notes/categories/${item.id}`}
            className="truncate text-base text-black no-underline hover:text-blue-600"
          >
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
              <div className="flex items-center">
                <BookFilled
                  style={{ fontSize: "18px" }}
                  className="mr-2 text-blue-500"
                />
                <span className="text-base font-medium">{item.name}</span>
                <span className="text-gray-500 font-medium ml-2">
                  <LockOutlined />
                </span>
              </div>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
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
