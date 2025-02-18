import React from "react";

class Rainbow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
      currentColorIndex: 0,
    };
  }

  render() {
    const { clickCount, currentColorIndex } = this.state;
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];
    const btnClick = () => {
      this.setState((prevState) => ({
        clickCount: prevState.clickCount + 1,
        currentColorIndex: (prevState.clickCount + 1) % colors.length,
      }));
    };

    const textColor = colors[currentColorIndex];
    const textMessage = `你已经点击了 ${clickCount} 次`;
    const achievementMessage =
      clickCount > 10 ? <div>解锁成就！你已经点击了超过 10 次！</div> : null;

    return (
      <div>
        <h2 style={{ color: textColor }}>{textMessage}</h2>
        <button onClick={btnClick}>点击我变换彩虹颜色🌈</button>
        {achievementMessage}
      </div>
    );
  }
}

export default Rainbow;
