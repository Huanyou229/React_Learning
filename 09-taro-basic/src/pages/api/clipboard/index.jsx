import { useState } from "react";
import { View, Input, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const ClipboardPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [clipboardText, setClipboardText] = useState("");

  // 设置剪贴板内容
  const handleCopy = () => {
    if (!inputValue) {
      Taro.showToast({ title: "请输入内容", icon: "none" });
      return;
    }
    Taro.setClipboardData({
      data: inputValue,
      success: () => {
        Taro.showToast({ title: "复制成功", icon: "success" });
      },
    });
  };

  // 获取剪贴板内容
  const handlePaste = () => {
    Taro.getClipboardData({
      success: (res) => {
        setClipboardText(res.data);
        Taro.showToast({ title: "粘贴成功", icon: "success" });
      },
    });
  };

  return (
    <View className="clipboard-page">
      <Text className="title">📋 剪贴板功能演示</Text>

      <Input
        className="input-box"
        placeholder="请输入要复制的文字"
        value={inputValue}
        onInput={(e) => setInputValue(e.detail.value)}
      />

      <View className="btn-group">
        <Button className="btn copy" onClick={handleCopy}>
          复制内容
        </Button>
        <Button className="btn paste" onClick={handlePaste}>
          粘贴内容
        </Button>
      </View>

      <View className="result-box">
        <Text className="label">📥 剪贴板内容：</Text>
        <Text className="content">{clipboardText || "暂无内容"}</Text>
      </View>
    </View>
  );
};

export default ClipboardPage;
