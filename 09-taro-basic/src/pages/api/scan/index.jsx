import React, { useState } from "react";
import { View, Button, WebView, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const ScanWebViewPage = () => {
  const [url, setUrl] = useState("");

  const handleScan = () => {
    Taro.scanCode({
      success: (res) => {
        if (res.result && res.result.startsWith("http")) {
          setUrl(res.result);
        } else {
          Taro.showToast({ title: "⚠️ 扫码结果不是网址", icon: "none" });
        }
      },
      fail: () => {
        Taro.showToast({ title: "❌ 扫码失败", icon: "none" });
      },
    });
  };

  return (
    <View className="scan-webview-page">
      {url ? (
        <WebView src={url} />
      ) : (
        <>
          <View className="icon-container">
            <Text className="iconfont icon-saoma" />
          </View>
          <View className="title">📷 扫码打开网页 🔗</View>
          <View className="tip">✨ 支持二维码跳转，体验快捷访问网页内容</View>
          <Button className="scan-btn" onClick={handleScan}>
            <Text className="iconfont icon-saoma" style={{ marginRight: 8 }} />
            点击扫码
          </Button>
        </>
      )}
    </View>
  );
};

export default ScanWebViewPage;
