import { useImperativeHandle, forwardRef, useState } from "react";
const Counter2 = forwardRef((props, ref) => {
  const [count, setCount] = useState(10);
  // 使⽤ useImperativeHandle 暴露 reset ⽅法
  useImperativeHandle(ref, () => ({
    reset: () => {
      setCount(0); // 重置计数
    },
  }));
  return <div>Count: {count}</div>;
});
export default Counter2;
