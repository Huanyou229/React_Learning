import { useState, useEffect } from "react";
import SideNav from "./SideNav";
import ShortcutBlock from "./ShortcutBlock";
import "../css/BrowserHome.css";

const BrowserHome = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  };

  const formatWeekday = (date) => {
    const weekdays = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    return weekdays[date.getDay()];
  };

  const formatLunarDate = () => {
    // 假数据，实际需要根据日期计算农历
    return "正月二十";
  };

  return (
    <div className="browser-home">
      <SideNav />
      <div className="content">
        <div className="time">{time.toLocaleTimeString()}</div>
        <div className="date-info">
          <div className="date-info-item">{formatDate(time)}</div>
          <div className="date-info-item">{formatWeekday(time)}</div>
          <div className="date-info-item">{formatLunarDate()}</div>
        </div>
        <input type="text" className="search-box" placeholder=" 🔍 搜索..." />
        <div className="shortcut-grid">
          {shortcutData.map((shortcut, index) => (
            <ShortcutBlock
              key={index}
              name={shortcut.name}
              url={shortcut.url}
              icon={shortcut.icon}
            />
          ))}
        </div>

        <div className="saying">我曾踏月而来，只因你在山中。</div>
        <div className="author">- 席慕蓉 -</div>
      </div>
    </div>
  );
};

const shortcutData = [
  {
    name: "Google",
    url: "https://www.google.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/google.png",
  },
  {
    name: "Bing",
    url: "https://www.bing.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/bing.png",
  },
  {
    name: "百度",
    url: "https://www.baidu.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/baidu.png",
  },
  {
    name: "GitHub",
    url: "https://www.github.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/github.png",
  },
  {
    name: "CSDN",
    url: "https://www.csdn.net",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/csdn.png",
  },
  {
    name: "Bilibili",
    url: "https://www.bilibili.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/bilibili.png",
  },
  {
    name: "牛客网",
    url: "https://www.nowcoder.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/nowcoder.png",
  },
  {
    name: "力扣",
    url: "https://leetcode-cn.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/leetcode.png",
  },
  {
    name: "爱奇艺",
    url: "https://www.iqiyi.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/iqiyi.png",
  },
  {
    name: "知乎",
    url: "https://www.zhihu.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/zhihu.png",
  },
  {
    name: "语雀",
    url: "https://www.yuque.com",
    icon: "https://www.yuque.com/favicon.ico",
  },
  {
    name: "有道翻译",
    url: "https://fanyi.youdao.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/youdao.png",
  },
  {
    name: "Kimi",
    url: "https://kimi.moonshot.cn",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/kimi.webp",
  },
  {
    name: "腾讯视频",
    url: "https://v.qq.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/tencentvideo.png",
  },
  {
    name: "QQ邮箱",
    url: "https://mail.qq.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/QQ-email.png",
  },
  {
    name: "掘金",
    url: "https://juejin.cn",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/juejin.png",
  },
  {
    name: "花瓣",
    url: "https://huaban.com",
    icon: "https://huaban.com/favicon.ico",
  },
  {
    name: "4399小游戏",
    url: "https://www.4399.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/4399.png",
  },
  {
    name: "微信读书",
    url: "https://weread.qq.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/weread.jpeg",
  },
  {
    name: "小红书",
    url: "https://www.xiaohongshu.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/xiaohongshu.png",
  },
  {
    name: "网易云音乐",
    url: "https://music.163.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/wyy-music.png",
  },
  {
    name: "QQ音乐",
    url: "https://y.qq.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/QQ-music.png",
  },
  {
    name: "抖音",
    url: "https://www.douyin.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/dy.png",
  },
  {
    name: "豆瓣",
    url: "https://www.douban.com",
    icon: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/url-img/douban.png",
  },
];

export default BrowserHome;
