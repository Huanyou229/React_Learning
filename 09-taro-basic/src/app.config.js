export default defineAppConfig({
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示",
    },
  },
  pages: [
    "pages/tabs/index/index",
    "pages/tabs/discover/index",
    "pages/tabs/profile/index",
    "pages/tabs/component/index",
    "pages/tabs/api/index",

    "pages/index/product/index",
    "pages/profile/login/index",

    "pages/discover/namecard/index",
    "pages/discover/music/index",
    "pages/discover/account-book/index",

    "pages/component/basic/index",
    "pages/component/container/index",
    "pages/component/form/index",
    "pages/component/location/index",
    "pages/component/map/index",
    "pages/component/media/index",
    "pages/component/movable/index",
    "pages/component/skyline/index",
    "pages/component/webview/index",
    "pages/component/canvas/index",

    "pages/api/bluetooth/index",
    "pages/api/clipboard/index",
    "pages/api/contact/index",
    "pages/api/device/index",
    "pages/api/network/index",
    "pages/api/scan/index",
    "pages/api/snapshot/index",
    "pages/api/calendar/index",
    "pages/api/werun/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#4594D5",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white",
    enableSkyline: true,
  },
  tabBar: {
    color: "#999",
    selectedColor: "#4594D5",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/tabs/index/index",
        text: "首页",
        iconPath: "./assets/tabs/home.png",
        selectedIconPath: "./assets/tabs/home-active.png",
      },
      {
        pagePath: "pages/tabs/discover/index",
        text: "发现",
        iconPath: "./assets/tabs/discover.png",
        selectedIconPath: "./assets/tabs/discover-active.png",
      },
      {
        pagePath: "pages/tabs/component/index",
        text: "组件",
        iconPath: "./assets/tabs/component.png",
        selectedIconPath: "./assets/tabs/component-active.png",
      },
      {
        pagePath: "pages/tabs/api/index",
        text: "API",
        iconPath: "./assets/tabs/api.png",
        selectedIconPath: "./assets/tabs/api-active.png",
      },
      {
        pagePath: "pages/tabs/profile/index",
        text: "我的",
        iconPath: "./assets/tabs/profile.png",
        selectedIconPath: "./assets/tabs/profile-active.png",
      },
    ],
  },
});
