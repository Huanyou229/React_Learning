// 行内样式
// const Div = () => {
//   return (
//     <div
//       style={{
//         width: "200px",
//         height: "200px",
//         lineHeight: "200px",
//         textAlign: "center",
//         backgroundColor: "#14B1D6",
//         color: "#fff",
//       }}
//     >
//       这是⼀个div
//     </div>
//   );
// };
// export default Div;

// 内联样式
// const divStyle = {
//   width: "200px",
//   height: "200px",
//   lineHeight: "200px",
//   textAlign: "center",
//   backgroundColor: "pink",
//   color: "#fff",
// };
// const Div = () => {
//   return <div style={divStyle}>这是⼀个div</div>;
// };
// export default Div;

// 外部样式
import "./style.css";
const Div = () => {
  return <div className="box">这是⼀个div</div>;
};
export default Div;
