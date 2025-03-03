import { useState, useLayoutEffect } from "react";
// AnimateBox 组件，⽤于创建⼀个随时间移动的盒⼦
const AnimateBox = () => {
  // 使⽤ useState Hook 创建⼀个名为 position 的状态变量，初始值为 0，这个状态变量 将⽤于存储盒⼦的 X 坐标位置
  const [position, setPosition] = useState(0);
  // 使⽤ useLayoutEffect Hook 来处理与布局相关的副作⽤，这个 effect 会在组件被挂 载到 DOM 后⽴即执⾏
  useLayoutEffect(() => {
    // 创建⼀个定时器，每隔 100 毫秒更新⼀次 position 状态
    const timer = setInterval(() => {
      setPosition((prev) => prev + 5); // 每次增加 5 像素
    }, 100);
    // 返回⼀个清理函数，在组件卸载或重新渲染前执⾏，这个清理函数⽤于清除定时器，防⽌内 存泄漏
    return () => clearInterval(timer);
  }, []); // 空依赖数组意味着这个 effect 只在组件⾸次渲染时运⾏⼀次
  // 渲染组件，包括⼀个 div 元素
  // div 元素的样式包括宽度、⾼度、背景颜⾊和变换属性，变换属性使⽤ translateX 函数根 据 position 状态设置 X 坐标
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        transform: `translateX(${position}px)`, // 根据 position 状态设置 X坐标,
      }}
    />
  );
};
export default AnimateBox;
