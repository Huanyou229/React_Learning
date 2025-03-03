import { useState, useEffect } from "react";

// 定义一个Time组件
const Time = () => {
  // 使用useState钩子，初始化time为当前时间
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // 使用useEffect钩子，在组件挂载时设置定时器，每秒更新一次时间
  useEffect(() => {
    // 设置一个定时器，每秒更新一次时间
    const timer = setInterval(() => {
      // 将当前时间转换为本地时间格式
      setTime(new Date().toLocaleTimeString());
      // 设置定时器，每隔1000毫秒执行一次
    }, 1000);

    // 在组件卸载时清除定时器
    return () => {
      // 清除定时器
      clearInterval(timer);
    };
  }, []); // // 在这里可以执行一些副作用操作，比如发送网络请求、订阅事件等

  // 返回一个h1，显示当前时间
  return <h1>{time}</h1>;
};

export default Time;
