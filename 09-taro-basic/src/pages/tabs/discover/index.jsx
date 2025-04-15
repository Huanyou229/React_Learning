import { View, Navigator } from "@tarojs/components";
import "./index.scss";

const Discover = () => {
  return (
    <View className="discover-container">
      <Navigator url="/pages/discover/namecard/index" className="nav-item">
        个人名片生成器
      </Navigator>
      <Navigator url="/pages/discover/music/index" className="nav-item">
        音乐盒子
      </Navigator>
      <Navigator url="/pages/discover/account-book/index" className="nav-item">
        记账本
      </Navigator>
    </View>
  );
};

export default Discover;
