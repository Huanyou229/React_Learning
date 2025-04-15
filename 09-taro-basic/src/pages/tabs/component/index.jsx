import { View, Navigator } from "@tarojs/components";

import "./index.scss";

const Component = () => {
  return (
    <View className="component-container">
      <Navigator url="/pages/component/container/index" className="nav-item">
        容器
      </Navigator>
      <Navigator url="/pages/component/basic/index" className="nav-item">
        基础容器
      </Navigator>
      <Navigator url="/pages/component/form/index" className="nav-item">
        表单组件
      </Navigator>
      <Navigator url="/pages/component/skyline/index" className="nav-item">
        skyline
      </Navigator>
      <Navigator url="/pages/component/media/index" className="nav-item">
        媒体组件
      </Navigator>
      <Navigator url="/pages/component/map/index" className="nav-item">
        地图
      </Navigator>
      <Navigator url="/pages/component/location/index" className="nav-item">
        定位
      </Navigator>
      <Navigator url="/pages/component/movable/index" className="nav-item">
        可移动视图容器
      </Navigator>
      <Navigator url="/pages/component/webview/index" className="nav-item">
        网页容器
      </Navigator>
      <Navigator url="/pages/component/canvas/index" className="nav-item">
        画布
      </Navigator>
    </View>
  );
};

export default Component;
