import { useState } from "react";
import { View, MovableArea, MovableView, Text } from "@tarojs/components";
import "./index.scss";

const Movable = () => {
  const [scale, setScale] = useState(1);

  // 缩放事件回调
  const handleScale = (e) => {
    const { scale: newScale } = e.detail;
    setScale(newScale);
  };
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onChange = (e) => {
    const { x, y } = e.detail;
    setPosition({ x, y });
  };

  return (
    <View className="movable-page">
      <Text className="title">🎯 双指缩放 + 拖动示例</Text>
      <Text className="tips">请在真机上使用两根手指缩放小球</Text>
      <Text className="tips">当前缩放比例：{scale.toFixed(2)}</Text>

      <MovableArea className="movable-area">
        <MovableView
          className="movable-ball"
          direction="all"
          x={position.x}
          y={position.y}
          inertia // 拖动后具有惯性滑动
          damping={20} // 阻尼系数，越小越灵敏
          friction={2} // 摩擦力，决定滑行距离
          scale
          scaleMin={0.5}
          scaleMax={2}
          onScale={handleScale} // 只展示用，不控制 scaleValue
          onChange={onChange} // 拖动位置变化事件
        >
          🎈
        </MovableView>
      </MovableArea>
      <View className="position-info">
        当前坐标:X: {position.x.toFixed(0)}, Y: {position.y.toFixed(0)}
      </View>
    </View>
  );
};

export default Movable;
