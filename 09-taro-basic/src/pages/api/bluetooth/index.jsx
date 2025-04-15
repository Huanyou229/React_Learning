import { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Bluetooth = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [adapterState, setAdapterState] = useState({});
  const [isAdapterOpen, setIsAdapterOpen] = useState(false);

  // 初始化蓝牙模块
  useEffect(() => {
    initBluetooth();
    return () => {
      stopDiscovery();
      Taro.closeBluetoothAdapter();
    };
  }, []);

  // 初始化蓝牙适配器
  const initBluetooth = async () => {
    try {
      await Taro.openBluetoothAdapter();
      setIsAdapterOpen(true);
      listenAdapterState();
      startDiscovery();
    } catch (err) {
      Taro.showToast({ title: "请打开系统蓝牙", icon: "none" });
    }
  };

  // 监听蓝牙适配器状态变化
  const listenAdapterState = () => {
    Taro.onBluetoothAdapterStateChange((res) => {
      setAdapterState(res);
    });
  };

  // 开始扫描设备
  const startDiscovery = async () => {
    await Taro.startBluetoothDevicesDiscovery({ allowDuplicatesKey: false });
    Taro.onBluetoothDeviceFound((res) => {
      setDevices((prev) =>
        [...prev, ...res.devices].filter(
          (device, index, self) =>
            device.deviceId &&
            self.findIndex((d) => d.deviceId === device.deviceId) === index
        )
      );
    });
  };

  // 停止扫描
  const stopDiscovery = async () => {
    await Taro.stopBluetoothDevicesDiscovery();
    Taro.offBluetoothDeviceFound();
  };

  // 尝试配对设备
  const pairDevice = async (deviceId) => {
    try {
      await Taro.makeBluetoothPair({ deviceId });
      Taro.showToast({ title: "配对成功", icon: "success" });
    } catch {
      Taro.showToast({ title: "配对失败", icon: "none" });
    }
  };

  // 查看是否已配对
  const checkPaired = async (deviceId) => {
    try {
      const res = await Taro.isBluetoothDevicePaired({ deviceId });
      Taro.showToast({
        title: res.isPaired ? "已配对" : "未配对",
        icon: "none",
      });
    } catch {
      Taro.showToast({ title: "查询失败", icon: "none" });
    }
  };

  // 获取已连接设备
  const getConnected = async () => {
    const res = await Taro.getConnectedBluetoothDevices();
    setConnectedDevices(res.devices || []);
  };

  // 获取适配器状态
  const fetchAdapterState = async () => {
    const res = await Taro.getBluetoothAdapterState();
    setAdapterState(res);
  };

  // 关闭适配器
  const shutdownBluetooth = async () => {
    await Taro.closeBluetoothAdapter();
    setIsAdapterOpen(false);
    setDevices([]);
    Taro.showToast({ title: "已关闭蓝牙", icon: "none" });
  };

  return (
    <View className="bluetooth-page">
      <Text className="title">🔵 蓝牙设备列表</Text>

      <ScrollView scrollY className="device-list">
        {devices.map((device) => (
          <View className="device-card" key={device.deviceId}>
            <Text className="device-name">{device.name || "未知设备"}</Text>
            <Text className="device-id">{device.deviceId}</Text>
            <View className="btn-group">
              <Button size="mini" onClick={() => pairDevice(device.deviceId)}>
                配对
              </Button>
              <Button size="mini" onClick={() => checkPaired(device.deviceId)}>
                是否配对
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="bottom-actions">
        <Button onClick={getConnected}>查看已连接设备</Button>
        <Button onClick={fetchAdapterState}>适配器状态</Button>
        <Button type="warn" onClick={shutdownBluetooth}>
          关闭蓝牙
        </Button>
      </View>

      {connectedDevices.length > 0 && (
        <View className="connected-section">
          <Text className="subtitle">✅ 已连接设备</Text>
          {connectedDevices.map((dev, idx) => (
            <Text key={idx} className="connected-item">
              {dev.deviceId}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default Bluetooth;
