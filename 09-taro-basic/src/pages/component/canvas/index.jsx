import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import { View, Canvas, Button } from "@tarojs/components";
import "./index.scss";

export default function CanvasDemo() {
  const canvasId = "myCanvas";
  const ctxRef = useRef(null);

  useEffect(() => {
    // 使用 createCanvasContext 替代 createSelectorQuery 获取 node
    const ctx = Taro.createCanvasContext(canvasId, this);
    ctx.setStrokeStyle("#fd3d4a");
    ctx.setLineWidth(4);
    ctx.setLineCap("round");
    ctx.setLineJoin("round");
    ctxRef.current = ctx;
  }, []);

  let isDrawing = false;

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(touch.x, touch.y);
    isDrawing = true;
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    ctxRef.current.lineTo(touch.x, touch.y);
    ctxRef.current.stroke();
    ctxRef.current.draw(true);
  };

  const handleTouchEnd = () => {
    isDrawing = false;
  };

  const handleClear = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, 300, 300); // 注意修改为你的 canvas 宽高
    ctx.draw();
  };

  return (
    <View className="canvas-wrapper">
      <View className="title">🖌️ 签名板</View>
      <Canvas
        canvasId={canvasId}
        className="canvas"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <Button className="clear-btn" onClick={handleClear}>
        清空画布
      </Button>
    </View>
  );
}
