import { useState, useCallback } from "react";
import ExpensiveComponent from "./ExpensiveComponent";
// ExpensiveComponentParent 组件，⽤于展示计数器并包含⼀个昂贵的⼦组件
const ExpensiveComponentParent = () => {
  // 使⽤ useState Hook 创建⼀个名为 count 的状态变量，初始值为 0
  const [count, setCount] = useState(0);
  // 使⽤ useCallback Hook 创建⼀个 memoizedAction 函数
  // useCallback 确保在 count 未发⽣变化时，重复使⽤相同的函数实例，这有助于避免不必 要的重新渲染，特别是在传递给 ExpensiveComponent 时
  const memoizedAction = useCallback(() => {
    setCount(count + 1); // 点击时，将 count 状态加 1
  }, [count]); // 依赖数组，当 count 发⽣变化时重新创建 memoizedAction 函数
  // 渲染组件，显示当前的 count 值和⼀个 ExpensiveComponent ⼦组件
  return (
    <div>
      <p>Count: {count}</p>
      <ExpensiveComponent onAction={memoizedAction} />
    </div>
  );
};
export default ExpensiveComponentParent;
