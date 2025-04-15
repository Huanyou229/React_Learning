import { useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const NetworkPage = () => {
  const [networkType, setNetworkType] = useState("未知");
  const [isConnected, setIsConnected] = useState(true);
  const [localIP, setLocalIP] = useState("未获取");
  const [isWeakNet, setIsWeakNet] = useState(false);

  // 获取当前网络类型
  const getNetworkInfo = async () => {
    try {
      const res = await Taro.getNetworkType();
      setNetworkType(res.networkType);
    } catch (err) {
      Taro.showToast({ title: "获取网络失败", icon: "none" });
    }
  };

  // 获取本地 IP 地址
  const getLocalIP = async () => {
    try {
      const res = await Taro.getLocalIPAddress();
      setLocalIP(res.localip || "未识别");
    } catch (err) {
      Taro.showToast({ title: "无法获取IP", icon: "none" });
    }
  };

  useEffect(() => {
    // 初始信息获取
    getNetworkInfo();
    getLocalIP();

    // 网络状态变化监听
    Taro.onNetworkStatusChange((res) => {
      setIsConnected(res.isConnected);
      setNetworkType(res.networkType);
    });

    // 网络弱信号监听
    Taro.onNetworkWeakChange(() => {
      setIsWeakNet(true);
      Taro.showToast({ title: "当前网络较弱", icon: "none" });
    });

    // 清理监听器
    return () => {
      Taro.offNetworkStatusChange();
      Taro.offNetworkWeakChange();
    };
  }, []);

  return (
    <View className="network-page">
      <Text className="title">📡 网络信息检测</Text>

      <View className="info-box">
        <Text className="label">当前网络类型：</Text>
        <Text className="value">{networkType}</Text>
      </View>

      <View className="info-box">
        <Text className="label">网络是否连接：</Text>
        <Text className="value">{isConnected ? "✅ 已连接" : "❌ 未连接"}</Text>
      </View>

      <View className="info-box">
        <Text className="label">网络是否较弱：</Text>
        <Text className="value">{isWeakNet ? "⚠️ 是" : "✔️ 否"}</Text>
      </View>

      <View className="info-box">
        <Text className="label">本地 IP 地址：</Text>
        <Text className="value">{localIP}</Text>
      </View>

      <Button
        className="btn refresh"
        onClick={() => {
          getNetworkInfo();
          getLocalIP();
          setIsWeakNet(false);
        }}
      >
        🔄 刷新网络信息
      </Button>
    </View>
  );
};

export default NetworkPage;
