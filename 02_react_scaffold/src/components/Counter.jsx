import React from "react";
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    // 绑定⽅法this指向
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  // 增加计数
  handleIncrement() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>当前计数: {this.state.count}</h2>
        <div>
          <button
            onClick={this.handleIncrement}
            style={{ ...buttonStyle, marginLeft: "10px" }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
// 按钮样式对象
const buttonStyle = {
  padding: "10px 30px",
  fontSize: "20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
export default Counter;
