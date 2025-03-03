import { useState, useEffect } from "react";

const PageTitle = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `你点击了${count}次`;
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
};

export default PageTitle;
