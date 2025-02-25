// src/components/book/BookDetail.jsx
import PropTypes from "prop-types";
import "./style.css"; // 引入样式文件

const BookDetail = ({ book, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="book-detail-header">
          <h2>《{book.title}》</h2>
        </div>
        <div className="book-detail-content">
          <img src={book.cover} alt={book.title} className="book-cover" />
          <div className="book-detail-info">
            <p>
              <strong>作者：</strong>
              {book.author}
            </p>
            <p>
              <strong>出版年份：</strong>
              {book.year}
            </p>
            <p>
              <strong>图书简介：</strong>
              {book.description}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="close-button">
          关闭
        </button>
      </div>
    </div>
  );
};

BookDetail.propTypes = {
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookDetail;
