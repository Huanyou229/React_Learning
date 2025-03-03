import React, { useRef } from "react";
import Child1 from "./Child1"; // 导⼊ Child1 组件
// Parent1 组件，⽤于演示如何通过 ref 操控⼦组件 Child1 的 DOM 元素
const Parent1 = () => {
  // 使⽤ useRef Hook 创建⼀个 ref 对象，⽤于访问 Child1 组件
  const childRef = useRef();
  // 渲染组件，包括⼀个按钮和⼀个 Child1 ⼦组件
  return (
    <div>
      {/* 按钮点击事件处理函数，调⽤ childRef.current.focus() 来设置 Child1 输⼊ 框的焦点 */}
      <button onClick={() => childRef.current.focus()}>
        Focus Child Input
      </button>
      {/* 将 childRef 传递给 Child1 组件，以便在 Child1 内部通过 useImperative
Handle 暴露 focus ⽅法 */}
      <Child1 ref={childRef} />
    </div>
  );
};
export default Parent1;
