import { useState, useEffect } from "react";
// ⾃定义 Hook：useDebounce
// 该 Hook ⽤于实现防抖功能，即在指定延迟时间内，如果连续触发事件，则只有最后⼀次事件会被执⾏
function useDebounce(value, delay) {
  // 使⽤ useState Hook 创建⼀个状态变量 debouncedValue，⽤于存储防抖后的值
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 使⽤ useEffect Hook 来处理副作⽤操作，即设置定时器
  useEffect(() => {
    // 设置⼀个定时器，在 delay 毫秒后更新 debouncedValue 状态为当前的 value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 清理函数，在组件卸载或 effect 重新运⾏前执⾏，⽤于清除定时器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 依赖数组，当 value 或 delay 发⽣变化时，重新设置定时器
  // 返回防抖后的值，供组件使⽤
  return debouncedValue;
}
export default useDebounce;
