import { useRef } from "react";
// FocusInput 组件，⽤于演示如何使⽤ ref 来控制输⼊框的焦点
const FocusInput = () => {
  // 使⽤ useRef Hook 创建⼀个 ref 对象，⽤于访问 DOM 元素
  const inputRef = useRef(null);
  // 定义⼀个函数，⽤于设置输⼊框的焦点
  const focusInput = () => {
    // 如果 ref 当前关联的元素存在，则调⽤ focus ⽅法
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  // 渲染组件，包括⼀个输⼊框和⼀个按钮
  // 输⼊框的 ref 属性设置为 inputRef，以便在需要时可以访问该元素，按钮的 onClick事件处理函数设置为 focusInput，以便在点击按钮时调⽤
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};
export default FocusInput;
