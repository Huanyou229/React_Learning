import React from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  const { bookId } = useParams();
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Book Page</h2>
      <h3>bookId:{bookId}</h3>
    </div>
  );
};

export default Book;
