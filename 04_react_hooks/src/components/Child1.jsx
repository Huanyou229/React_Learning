import { useImperativeHandle, forwardRef } from "react";
// Child1 组件，使⽤ forwardRef 和 useImperativeHandle 来暴露 DOM 操作给⽗组件
const Child1 = forwardRef((props, ref) => {
  // 使⽤ useImperativeHandle Hook 来⾃定义暴露给⽗组件的实例⽅法
  // 这⾥暴露了⼀个名为 focus 的⽅法，⽤于设置输⼊框的焦点
  useImperativeHandle(ref, () => ({
    focus: () => {
      // 当⽗组件调⽤这个⽅法时，它将获取到 id 为 "child-input" 的 DOM 元素，并设 置焦点
      document.getElementById("child-input").focus();
    },
  }));
  // 渲染⼀个输⼊框元素，其 id 为 "child-input"
  return <input id="child-input" type="text" />;
});
export default Child1;
