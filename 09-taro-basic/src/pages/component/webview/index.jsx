import { View, Text, WebView, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Webview = () => {
  // 获取页面参数中的链接地址
  const { url = "https://www.baidu.com" } =
    Taro.getCurrentInstance().router.params || {};

  return (
    <View className="webview-container">
      {/* 自定义顶部导航栏 */}
      <View className="navbar">
        <Navigator openType="navigateBack" className="back-btn">
          ⬅ 返回
        </Navigator>
        <Text className="title">网页浏览</Text>
      </View>

      {/* WebView 用于嵌入网页 */}
      <WebView className="webview" src={decodeURIComponent(url)} />
    </View>
  );
};

export default Webview;
