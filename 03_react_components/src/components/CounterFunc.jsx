// 导⼊ React 的 useState Hook，⽤于在函数组件中使⽤状态
import { useState } from "react";
// 定义⼀个函数式计数器组件
const CounterFunc = () => {
  // 使⽤ useState 初始化状态，解构出当前状态值 count 和更新函数 setCount
  // 初始值设置为 0
  const [count, setCount] = useState(0);
  // 定义递增函数，通过 setCount 更新状态
  // 每次调⽤会将 count 的值增加 1
  const increment = () => setCount(count + 1);
  // 组件渲染内容
  return (
    <div>
      {/* 显示当前计数器的值 */}
      <h1>{count}</h1>

      {/* 点击按钮触发 increment 函数实现计数器递增 */}
      {/* 注意这⾥ onClick 接收的是函数引⽤，⽽不是函数调⽤ */}
      <button onClick={increment}>点击增加</button>
    </div>
  );
};
// 导出组件供其他⽂件使⽤
export default CounterFunc;
