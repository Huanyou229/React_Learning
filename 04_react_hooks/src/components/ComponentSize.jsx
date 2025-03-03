import { useState, useLayoutEffect, useRef } from "react";
// ComponentSize 组件，⽤于展示⼦组件的尺⼨
const ComponentSize = () => {
  // 使⽤ useState Hook 创建⼀个名为 size 的状态变量，初始值为 0，这个状态变量将⽤ 于存储⼦组件的宽度
  const [size, setSize] = useState(0);
  // 使⽤ useRef Hook 创建⼀个 ref 对象，⽤于访问⼦组件的 DOM 元素
  const divRef = useRef();
  // 使⽤ useLayoutEffect Hook 来执⾏ DOM 相关的副作⽤操作，这个 effect 会在组件 渲染到屏幕之后⽴即执⾏，并且会在组件更新后重新执⾏
  useLayoutEffect(() => {
    // 通过 ref 获取⼦组件的 DOM 元素，并获取其宽度
    setSize(divRef.current.offsetWidth);
  }, []); // 空依赖数组意味着这个 effect 只在组件⾸次渲染时运⾏⼀次
  // 渲染组件，包括⼀个⼦组件和⼀个段落
  // ⼦组件的 ref 属性设置为 divRef，以便在 useLayoutEffect 中访问该元素，段落元素 显示⼦组件的宽度
  return (
    <div>
      <div
        ref={divRef}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "lightblue",
        }}
      ></div>
      <p>Width of div: {size}</p>
    </div>
  );
};
export default ComponentSize;
