// src/components/book/BookInput.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "./style.css"; // 引入样式文件

const BookInput = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [cover, setCover] = useState(""); // 封面图片链接
  const [description, setDescription] = useState(""); // 图书详情
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹窗的显示与隐藏

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单的默认提交行为
    if (title && author && year && cover) {
      const newBook = {
        id: Date.now(),
        title,
        author,
        year,
        cover,
        description,
      };
      onAddBook(newBook);
      setTitle("");
      setAuthor("");
      setYear("");
      setCover("");
      setDescription("");
      setIsModalOpen(false); // 提交后关闭弹窗
    }
  };

  return (
    <>
      {/* 按钮：打开弹窗 */}
      <button onClick={() => setIsModalOpen(true)} className="add-button">
        添加图书
      </button>

      {/* 弹窗 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>添加图书</h2>
            <form className="book-input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="书名"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="作者"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="text"
                placeholder="出版年份"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <input
                type="text"
                placeholder="图书封面url"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
              />
              <textarea
                placeholder="图书简介"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* 提交按钮 */}
              <button type="submit" className="submit-button">
                提交
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="close-button"
              >
                关闭
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

BookInput.propTypes = {
  onAddBook: PropTypes.func.isRequired,
};

export default BookInput;
