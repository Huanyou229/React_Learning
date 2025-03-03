import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce"; // 导⼊⾃定义的 useDebounceHook;
// Search 组件，⽤于创建⼀个搜索输⼊框，并将输⼊值传递给⽗组件处理
const Search = ({ onSearch }) => {
  // 使⽤ useState Hook 创建⼀个名为 input 的状态变量，⽤于存储输⼊框的值
  const [input, setInput] = useState("");
  // 使⽤ useDebounce Hook 创建⼀个 debouncedInput 变量，它将在输⼊停⽌后的 300毫秒内更新;
  const debouncedInput = useDebounce(input, 300);
  // 使⽤ useEffect Hook 来处理副作⽤操作，即在 debouncedInput 更新后执⾏搜索
  useEffect(() => {
    // 如果 debouncedInput 存在（即输⼊框⾮空），调⽤⽗组件传递的 onSearch 函数
    if (debouncedInput) {
      onSearch(debouncedInput);
    }
  }, [debouncedInput, onSearch]); // 依赖数组，当 debouncedInput 或 onSearch 发⽣变化时执⾏ effect
  // 渲染组件，包括⼀个输⼊框，输⼊框的值绑定到 input 状态，当输⼊框的值改变时，通过 setInput 函数更新状态
  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)} // 输⼊框值改变时，更新 input 状态
      placeholder="Search..." // 输⼊框的占位符⽂本
    />
  );
};
export default Search;
