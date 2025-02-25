// src/components/book/BookItem.jsx
import PropTypes from "prop-types";
import { useState } from "react";

const BookItem = ({
  title,
  author,
  year,
  cover,
  description,
  onDelete,
  onEdit,
  onSelect,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAuthor, setUpdatedAuthor] = useState(author);
  const [updatedYear, setUpdatedYear] = useState(year);
  const [updatedCover, setUpdatedCover] = useState(cover); // 添加封面更新的状态
  const [updatedDescription, setUpdatedDescription] = useState(description); // 添加简介更新的状态
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹框的显示与隐藏

  const handleEdit = () => {
    setIsModalOpen(true); // 打开弹框
  };

  const handleSave = () => {
    onEdit({
      title: updatedTitle,
      author: updatedAuthor,
      year: updatedYear,
      cover: updatedCover,
      description: updatedDescription,
    });
    setIsModalOpen(false); // 保存后关闭弹框
  };

  const handleCancel = () => {
    setIsModalOpen(false); // 取消后关闭弹框
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("确定要删除这本书吗？");
    if (isConfirmed) {
      onDelete(); // 调用父组件传入的 onDelete 函数
    }
  };

  return (
    <div>
      <li className="book-item">
        <img src={cover} alt={title} className="book-cover" />
        <div>
          <h3>{title}</h3>
          <p>{author}</p>
          <p>{year}</p>
          <button onClick={handleEdit}>编辑</button>
          <button onClick={handleDelete}>删除</button>
          <button onClick={onSelect}>查看详情</button>
        </div>
      </li>
      {/* 编辑弹窗 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>编辑图书</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="书名"
              />
              <input
                type="text"
                value={updatedAuthor}
                onChange={(e) => setUpdatedAuthor(e.target.value)}
                placeholder="作者"
              />
              <input
                type="text"
                value={updatedYear}
                onChange={(e) => setUpdatedYear(e.target.value)}
                placeholder="出版年份"
              />
              <input
                type="text"
                value={updatedCover}
                onChange={(e) => setUpdatedCover(e.target.value)}
                placeholder="图书封面url"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="图书简介"
              />
            </form>
            <div className="modal-actions">
              <button onClick={handleSave} className="save-button">
                保存
              </button>
              <button onClick={handleCancel} className="cancel-button">
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

BookItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BookItem;
