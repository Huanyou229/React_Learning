import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
// ThemeButton 组件，⽤于切换应⽤的主题模式
const ThemeButton = () => {
  // 使⽤ useContext Hook 从 ThemeContext 中获取当前的主题状态和设置函数
  const { theme, setTheme } = useContext(ThemeContext);
  // 渲染组件，包含⼀个按钮，⽤于切换主题模式
  return (
    <div
      style={{
        height: "100vh", // 设置组件⾼度为视⼝⾼度
        background: theme === "light" ? "white" : "black", // 根据主题状态设 置背景颜⾊
      }}
    >
      <p style={{ color: theme === "light" ? "black" : "white" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eos sint
        aspernatur. Repellat ipsum repudiandae provident inventore! Voluptatem
        natus assumenda, quam temporibus nobis debitis, tempore dolores
        similique ducimus quae voluptatibus!
      </p>
      {/* 按钮点击事件处理函数，切换主题状态 */}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {/* 按钮⽂本根据当前主题状态变化 */}
        切换到 {theme === "light" ? "暗⿊" : "明亮"} 模式
      </button>
    </div>
  );
};
export default ThemeButton;
