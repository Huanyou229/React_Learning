// src/components/book/BookList.jsx
import BookItem from "./BookItem";
import PropTypes from "prop-types";

const BookList = ({ books, onDeleteBook, onEditBook, onBookSelect }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          title={book.title}
          author={book.author}
          year={book.year}
          cover={book.cover}
          description={book.description}
          onDelete={() => onDeleteBook(book.id)}
          onEdit={(updatedBook) => onEditBook(book.id, updatedBook)}
          onSelect={() => onBookSelect(book)}
        />
      ))}
    </ul>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
  onEditBook: PropTypes.func.isRequired,
  onBookSelect: PropTypes.func.isRequired,
};

export default BookList;
