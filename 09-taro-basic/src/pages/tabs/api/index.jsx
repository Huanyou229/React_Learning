import { View, Navigator } from "@tarojs/components";

import "./index.scss";

const Api = () => {
  return (
    <View className="api-container">
      <Navigator url="/pages/api/contact/index" className="nav-item">
        联系人
      </Navigator>
      <Navigator url="/pages/api/device/index" className="nav-item">
        设备
      </Navigator>
      <Navigator url="/pages/api/bluetooth/index" className="nav-item">
        蓝牙
      </Navigator>
      <Navigator url="/pages/api/clipboard/index" className="nav-item">
        剪贴板
      </Navigator>
      <Navigator url="/pages/api/network/index" className="nav-item">
        网络
      </Navigator>
      <Navigator url="/pages/api/scan/index" className="nav-item">
        扫码
      </Navigator>
      <Navigator url="/pages/api/snapshot/index" className="nav-item">
        截屏
      </Navigator>
      <Navigator url="/pages/api/calendar/index" className="nav-item">
        日历
      </Navigator>
      <Navigator url="/pages/api/werun/index" className="nav-item">
        微信运动
      </Navigator>
    </View>
  );
};

export default Api;
