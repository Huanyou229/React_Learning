import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
// ThemeProvider 组件，⽤于包裹应⽤中需要访问主题的部分，它通过 Provider 组件向其⼦ 组件提供 theme 和 setTheme
const ThemeProvider = ({ children }) => {
  // 使⽤ useState Hook 创建⼀个 state 来存储当前主题，默认主题设置为 "light"（亮 ⾊模式）
  const [theme, setTheme] = useState("light");
  // 渲染 Provider 组件，并传递 theme 和 setTheme 作为 value 属性，这样，Provider 下的所有⼦组件都可以访问和修改主题
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children} // 渲染⼦组件
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
