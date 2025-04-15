import { View } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtForm, AtInput, AtButton } from "taro-ui";
import "./index.scss";

export default function Login() {
  const [username, setUsername] = useState("zhy");
  const [password, setPassword] = useState("123456");
  const handleLogin = () => {
    if (!username || !password) {
      Taro.showToast({
        title: "请输⼊⽤户名和密码",
        icon: "none",
      });
      return;
    }
    // 这⾥模拟登录成功
    Taro.setStorageSync("isLoggedIn", true);
    Taro.setStorageSync("username", username);
    // 设置⽤户头像URL
    Taro.setStorageSync(
      "avatarUrl",
      "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/avatar/zhy.jpg"
    );
    // 触发登录成功事件
    Taro.eventCenter.trigger("loginSuccess");
    Taro.showModal({
      title: "登录成功",
      icon: "success",
      success: () => {
        console.log("登录成功");
        Taro.switchTab({
          url: "/pages/tabs/index/index",
        });
      },
    });
  };
  return (
    <View className="login">
      <AtForm className="login-form">
        <AtInput
          name="username"
          title="⽤户名"
          type="text"
          placeholder="请输⼊⽤户名"
          value={username}
          onChange={setUsername}
        />
        <AtInput
          name="password"
          title="密码"
          type="password"
          placeholder="请输⼊密码"
          value={password}
          onChange={setPassword}
        />
        <AtButton type="primary" className="login-btn" onClick={handleLogin}>
          登录
        </AtButton>
      </AtForm>
    </View>
  );
}
