import { useMemo } from "react";
// ExpensiveCalculation 组件，⽤于执⾏⼀个计算密集型的操作，这个组件接收⼀个名为 number 的 prop，并返回该数字乘以 2 的结果
const ExpensiveCalculation = ({ number }) => {
  // 使⽤ useMemo Hook 来缓存计算结果，useMemo 会在其依赖项（这⾥是 number）发⽣变 化时才重新计算
  const result = useMemo(() => {
    console.log("Calculating..."); // 打印⽇志，表明计算正在进⾏
    return number * 2; // 执⾏计算并返回结果
  }, [number]); // 依赖数组，当 number 发⽣变化时重新计算
  // 渲染组件，显示计算结果
  return <div>{result}</div>;
};
export default ExpensiveCalculation;
