import { Component } from "react";
import ProTypes from "prop-types";

class WelcomeClass extends Component {
  // 渲染函数
  render() {
    return <h1>Hello,{this.props.name}</h1>;
  }
}

WelcomeClass.propTypes = {
  name: ProTypes.string,
};

export default WelcomeClass;
