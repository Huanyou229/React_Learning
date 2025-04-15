import { useState, useEffect } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const SnapshotPage = () => {
  const [snapshotPath, setSnapshotPath] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 监听页面截图行为（系统级截屏）
    // 检查是否支持 createSnapshot
    console.log("Skyline 支持状态：", Taro.canIUse?.("createSnapshot"));
    console.log(
      "createSnapshot 是否存在：",
      typeof Taro.createSnapshot === "function"
    );
    Taro.onUserCaptureScreen(() => {
      setMessage("📸 检测到你截屏啦（系统截图）");
      Taro.showToast({ title: "系统截屏成功！", icon: "none" });
    });

    return () => {
      Taro.offUserCaptureScreen();
    };
  }, []);

  // 点击按钮时，调用 Skyline 的 createSnapshot API
  const handleSnapshot = () => {
    const snapshotApi = Taro?.createSnapshot;
    if (!snapshotApi) {
      setMessage("⚠️ 当前环境不支持 Skyline Snapshot");
      Taro.showToast({ title: "不支持 Skyline 截图", icon: "none" });
      return;
    }

    snapshotApi({
      success: (res) => {
        setSnapshotPath(res.tempFilePath);
        setMessage("🖼️ 截图成功！点击下方预览");
        Taro.showToast({ title: "截图成功！", icon: "success" });
      },
      fail: (err) => {
        setMessage("❌ 截图失败，请重试");
        console.error(err);
      },
    });
  };

  return (
    <View className="snapshot-page">
      <Text className="icon">📷</Text>
      <View className="title">Skyline Snapshot 截屏示例</View>
      <View className="desc">点击按钮可通过 Skyline 引擎截图当前页面</View>

      <Button className="snapshot-btn" onClick={handleSnapshot}>
        ✨ 截图当前页面
      </Button>

      {message && <View className="message">{message}</View>}

      {snapshotPath && (
        <Image
          className="preview-img"
          src={snapshotPath}
          mode="aspectFit"
          onClick={() => Taro.previewImage({ urls: [snapshotPath] })}
        />
      )}
    </View>
  );
};

export default SnapshotPage;
