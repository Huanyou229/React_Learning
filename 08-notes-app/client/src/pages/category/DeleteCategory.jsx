import React, { useState } from "react";
import { Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCategory } from "@/api/categoryApi";
import { getNotesByCategory } from "@/api/noteApi";
import { useStore } from "@/store/userStore";
import PropTypes from "prop-types";

const DeleteCategory = ({ category, onDeleted }) => {
  const { user } = useStore();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    if (!user?.id) {
      message.error("请先登录后再进行操作");
      return;
    }
    try {
      setLoading(true);
      const res = await getNotesByCategory(category.id); // 去掉 userId
      if (res?.data?.length > 0) {
        message.warning("请先删除或移动该知识库下的所有笔记后再删除。");
        setConfirmDeleteVisible(false);
        return;
      }
      await deleteCategory(category.id);
      message.success("知识库已删除");
      onDeleted();
    } catch (error) {
      console.error("删除知识库失败:", error);
      message.error("删除知识库失败");
    } finally {
      setLoading(false);
      setConfirmDeleteVisible(false);
    }
  };

  return (
    <>
      <a onClick={handleDelete} style={{ color: "red", cursor: "pointer" }}>
        <DeleteOutlined style={{ fontSize: "14px" }} />
        <span className="ml-2">删除</span>
      </a>
      <Modal
        title="确认删除知识库"
        open={confirmDeleteVisible}
        onCancel={() => setConfirmDeleteVisible(false)}
        onOk={confirmDelete}
        okText="删除"
        okButtonProps={{ danger: true, loading }}
        cancelText="取消"
        centered
      >
        <p>
          确定要删除知识库 <b>{category.name}</b> 吗？此操作不可恢复。
        </p>
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
