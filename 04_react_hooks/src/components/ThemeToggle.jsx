import { useState } from "react";

const ThemeToggle = () => {
  // 使用useState 这个 Hook来存储当前的主题状态
  // isDarkMode 为 true表示暗黑模式
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((mode) => !mode);
  };
  return (
    <div
      style={{
        height: "100vh",
        background: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
      }}
    >
      <h2>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem sed
        praesentium, ullam consectetur quasi maxime voluptate accusamus
        inventore similique odit corrupti rem dignissimos consequatur? Magni
        quae cumque ea eaque fugiat.
      </h2>
      <button onClick={toggleTheme}>
        切换到{isDarkMode ? "白天" : "暗黑"}模式
      </button>
    </div>
  );
};

export default ThemeToggle;
