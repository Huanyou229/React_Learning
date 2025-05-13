// DeleteCategory.jsx
import React, { useState } from "react";
import { Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCategory } from "@/api/categoryApi";
import PropTypes from "prop-types";

const DeleteCategory = ({ category, onDeleted }) => {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const handleDelete = () => {
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(category.id);
      message.success("知识库已删除");
      onDeleted();
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.error("删除知识库失败:", error);
      message.error("删除知识库失败");
    }
  };

  return (
    <>
      <a onClick={handleDelete} style={{ color: "red", cursor: "pointer" }}>
        <DeleteOutlined style={{ fontSize: "14px" }} />
        <span className="ml-2">删除</span>
      </a>
      <Modal
        title="确认删除"
        visible={confirmDeleteVisible}
        onCancel={() => setConfirmDeleteVisible(false)}
        onOk={confirmDelete}
        okText="删除"
        okButtonProps={{ danger: true }}
        cancelText="取消"
        centered={true}
      >
        <p>确定要删除知识库 &quot;{category.name}&quot; 吗？此操作不可恢复。</p>
      </Modal>
    </>
  );
};

DeleteCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default DeleteCategory;
