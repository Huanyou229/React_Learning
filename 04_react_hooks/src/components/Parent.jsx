import { useState, useCallback } from "react";
import Child from "./Child";
// Parent 组件，⽤于展示计数器和包含⼀个⼦组件 Child
const Parent = () => {
  // 使⽤ useState Hook 创建⼀个名为 count 的状态变量，初始值为 0
  const [count, setCount] = useState(0);
  // 使⽤ useCallback Hook 创建⼀个 memoized（记忆化）的 handleClick 函数，useCallback 确保在 count 未发⽣变化时，重复使⽤相同的函数实例
  const handleClick = useCallback(() => {
    setCount(count + 1); // 点击时，将 count 状态加 1
  }, [count]); // 依赖数组，当 count 发⽣变化时重新创建 handleClick 函数
  // 渲染组件，显示当前的 count 值和⼀个 Child 组件
  return (
    <div>
      {/* 显示当前计数 */}
      <p>{count}</p>
      {/* 将 handleClick 函数传递给 Child 组件 */}
      <Child handleClick={handleClick} />
    </div>
  );
};
export default Parent;
