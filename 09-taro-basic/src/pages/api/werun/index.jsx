import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";

const WeRunPage = () => {
  const [stepInfo, setStepInfo] = useState(null);

  // 授权 + 获取微信运动数据
  const handleGetWeRunData = () => {
    Taro.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.werun"]) {
          // 若未授权，则先发起授权请求
          Taro.authorize({
            scope: "scope.werun",
            success: () => {
              fetchWeRunData();
            },
            fail: () => {
              Taro.showToast({
                title: "未授权微信运动权限",
                icon: "none",
              });
            },
          });
        } else {
          fetchWeRunData();
        }
      },
    });
  };

  // 实际获取微信运动数据
  const fetchWeRunData = () => {
    Taro.getWeRunData({
      success: (res) => {
        const encryptedData = res.encryptedData;
        const iv = res.iv;
        // 此数据需发送给后台解密获取步数信息
        console.log("encryptedData:", encryptedData);
        console.log("iv:", iv);
        setStepInfo({
          encryptedData,
          iv,
        });
        Taro.showToast({
          title: "获取成功✅",
          icon: "success",
        });
      },
      fail: (err) => {
        console.error("获取失败:", err);
        Taro.showToast({
          title: "获取失败 ❌",
          icon: "none",
        });
      },
    });
  };

  // 分享步数到微信运动
  const handleShareToWeRun = () => {
    Taro.shareToWeRun({
      success: () => {
        Taro.showToast({
          title: "已分享至微信运动 💪",
          icon: "success",
        });
      },
      fail: (err) => {
        console.error("分享失败：", err);
        Taro.showToast({
          title: "分享失败 ❌",
          icon: "none",
        });
      },
    });
  };

  return (
    <View className="we-run-page">
      <Text className="title">🏃‍♂️ 微信运动接口演示</Text>

      <Button className="btn primary" onClick={handleGetWeRunData}>
        获取微信运动数据
      </Button>

      <Button className="btn share" onClick={handleShareToWeRun}>
        分享步数到微信运动
      </Button>

      {stepInfo && (
        <View className="result">
          <Text className="subtitle">加密步数数据：</Text>
          <Text selectable className="code">
            encryptedData: {stepInfo.encryptedData}
          </Text>
          <Text selectable className="code">
            iv: {stepInfo.iv}
          </Text>
        </View>
      )}
    </View>
  );
};

export default WeRunPage;
