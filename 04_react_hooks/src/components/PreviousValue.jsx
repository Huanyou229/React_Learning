import { useState, useRef, useEffect } from "react";
// PreviousValue 组件，⽤于展示当前计数和前⼀个计数
const PreviousValue = () => {
  // 使⽤ useState Hook 创建⼀个名为 count 的状态变量，初始值为 0
  const [count, setCount] = useState(0);
  // 使⽤ useRef Hook 创建⼀个 ref 对象，⽤于存储前⼀个计数值
  const prevCountRef = useRef();
  // 使⽤ useEffect Hook 在每次 count 更新后执⾏，这个 effect 会在 count 变化后 ⽴即运⾏，更新 prevCountRef 的值
  useEffect(() => {
    prevCountRef.current = count; // 将当前的 count 值保存到 prevCountRef 中
  }, [count]); // 依赖数组，只有 count 发⽣变化时才会运⾏ effect
  // 渲染组件，显示当前计数和前⼀个计数
  return (
    <div>
      {/* 显示当前的计数值 */}
      <p>当前计数: {count}</p>
      {/* 显示前⼀个计数值 */}
      <p>前⼀计数: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};
export default PreviousValue;
