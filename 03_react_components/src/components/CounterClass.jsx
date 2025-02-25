import { Component } from "react";
class CounterClass extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>点击增加</button>
      </div>
    );
  }
}
export default CounterClass;
