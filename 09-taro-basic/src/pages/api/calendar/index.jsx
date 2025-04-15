import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";

const CalendarPage = () => {
  const [eventInfo, setEventInfo] = useState(null);

  // 普通日历事件
  const handleAddCalendar = () => {
    const now = new Date();
    const startTime = now.getTime(); // 时间戳
    console.log("startTime", startTime);
    const endTime = startTime + 60 * 60 * 1000;

    Taro.addPhoneCalendar({
      title: "📘 普通日历提醒",
      description: "一次性的学习提醒",
      location: "在线 or 自习室",
      startTime,
      endTime,
      success: () => {
        Taro.showToast({ title: "添加成功✅", icon: "success" });
        setEventInfo({
          type: "普通事件",
          startTime: new Date(startTime).toLocaleString(),
          endTime: new Date(endTime).toLocaleString(),
        });
      },
      fail: (err) => {
        console.error("添加失败：", err);
        Taro.showToast({ title: "添加失败 ❌", icon: "none" });
      },
    });
  };

  // 重复日历事件（每天9点）
  const handleAddRepeatCalendar = () => {
    const now = new Date();
    now.setHours(9, 0, 0, 0); // 今天早上9点
    const startTime = now.getTime();
    const endTime = startTime + 60 * 60 * 1000;

    Taro.addPhoneRepeatCalendar({
      title: "📅 每日学习计划",
      description: "每天早上打卡学习 📚",
      location: "书桌边 or 图书馆",
      startTime,
      endTime,
      recurrence: "RRULE:FREQ=DAILY;INTERVAL=1", // 每天重复
      success: () => {
        Taro.showToast({ title: "重复事件已添加🎉", icon: "success" });
        setEventInfo({
          type: "重复事件",
          startTime: new Date(startTime).toLocaleString(),
          endTime: new Date(endTime).toLocaleString(),
        });
      },
      fail: (err) => {
        console.error("重复事件添加失败：", err);
        Taro.showToast({ title: "添加失败 ❌", icon: "none" });
      },
    });
  };

  return (
    <View className="calendar-page">
      <Text className="title">📆 添加日历提醒</Text>

      <Button className="add-btn" onClick={handleAddCalendar}>
        📌 添加普通事件
      </Button>
      <Button className="repeat-btn" onClick={handleAddRepeatCalendar}>
        🔁 添加重复事件
      </Button>

      {eventInfo && (
        <View className="info">
          <Text>类型：{eventInfo.type}</Text>
          <Text>开始时间：{eventInfo.startTime}</Text>
          <Text>结束时间：{eventInfo.endTime}</Text>
        </View>
      )}
    </View>
  );
};

export default CalendarPage;
