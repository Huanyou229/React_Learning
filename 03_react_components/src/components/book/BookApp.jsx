// src/components/book/BookApp.jsx
import { useState } from "react";
import BookInput from "./BookInput";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import "./style.css";

const fakeBooks = [
  {
    id: 1,
    title: "JavaScript 高级程序设计",
    author: "Nicholas C. Zakas",
    year: "2018",
    cover:
      "https://cdn.weread.qq.com/weread/cover/88/YueWen_26211817/t6_YueWen_26211817.jpg",
    description:
      "本书是JavaScript编程领域的权威指南，详细介绍了从基础概念到高级应用的各个方面。书中涵盖了JavaScript的历史、实现、版本及其在HTML中的应用，深入探讨了变量、作用域、内存管理、引用类型、面向对象编程等核心概念。",
  },
  {
    id: 2,
    title: "React 实战",
    author: "马克·蒂伦斯·托马斯",
    year: "2020",
    cover:
      "https://cdn.weread.qq.com/weread/cover/55/YueWen_31151864/t6_YueWen_31151864.jpg",
    description:
      "本书全面涵盖了构建React应用所涉及的核心概念和API分为三个部分循序渐进地引导读者深入掌握React技术。读者将了解React的基本思想和关键点，掌握如何创建和组合组件，以及虚拟DOM的基础概念。",
  },
  {
    id: 3,
    title: "深入浅出 Node.js",
    author: "朴灵",
    year: "2016",
    cover:
      "https://wfqqreader-1252317822.image.myqcloud.com/cover/935/26211935/t6_26211935.jpg",
    description:
      "本书从多角度深入解析了Node.js的核心技术与应用实践,首先概览了Nodejs的诞生背景、命名起源及其对JavaScript生态的影响，帮助读者快速了解Node.js的基本概念。",
  },
  {
    id: 4,
    title: "Python 编程：从入门到实践",
    author: "Eric Matthes",
    year: "2016",
    cover:
      "https://cdn.weread.qq.com/weread/cover/8/YueWen_22806930/t6_YueWen_22806930.jpg",
    description:
      "本书旨在帮助所有层次的Python读者掌握Python编程的核心概念和实践技能。通过详细的章节，读者将学习到Python编程环境搭建、变量与数据类型、列表与字典操作、控制流与函数设计、面向对象编程中的类以及文件的读写操作。",
  },
  {
    id: 5,
    title: "成为波伏瓦",
    author: "凯特·柯克帕特里克",
    year: "2021",
    cover:
      "https://cdn.weread.qq.com/weread/cover/66/YueWen_36968035/t6_YueWen_36968035.jpg",
    description:
      "女人不是天生的，而是后天成为的。本书通过新近披露的信件和早期日记，深入挖掘西蒙娜·德·波伏瓦的真实生活和心灵旅程。",
  },
];
const BookApp = () => {
  const [books, setBooks] = useState(fakeBooks); // 初始化为假数据
  const [selectedBook, setSelectedBook] = useState(null);

  // 添加图书
  const addBook = (book) => {
    setBooks([...books, book]);
  };

  // 删除图书
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // 编辑图书
  const editBook = (id, updatedBook) => {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="container">
      <h1>图书管理系统</h1>
      <BookInput onAddBook={addBook} />
      <BookList
        books={books}
        onDeleteBook={deleteBook}
        onEditBook={editBook}
        onBookSelect={handleBookSelect}
      />
      {selectedBook && (
        <BookDetail book={selectedBook} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default BookApp;
