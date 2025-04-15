import { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";
import { musicList } from "./musicData";
import "./index.scss";

// 定义一个音乐组件
const Music = () => {
  // 定义当前播放的音乐
  const [current, setCurrent] = useState(null);
  // 定义音频上下文
  const [audioContext, setAudioContext] = useState(null);
  // 定义播放进度
  const [progress, setProgress] = useState(0);
  // 定义音乐时长
  const [duration, setDuration] = useState(0);
  // 定义是否正在播放
  const [isPlaying, setIsPlaying] = useState(false);

  // 组件挂载时创建音频上下文
  useEffect(() => {
    const audio = Taro.createInnerAudioContext();
    setAudioContext(audio);

    // 监听音频播放进度
    audio.onTimeUpdate(() => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    });

    // 组件卸载时销毁音频上下文
    return () => {
      audio.destroy();
    };
  }, []);

  // 处理播放按钮点击事件
  const handlePlay = (item) => {
    // 如果点击的音乐是当前播放的音乐
    if (current?.id === item.id) {
      // 如果当前音乐正在播放，则暂停
      if (!isPlaying) {
        audioContext.play();
        setIsPlaying(true);
      } else {
        // 如果当前音乐已经暂停，则播放
        audioContext.pause();
        setIsPlaying(false);
      }
    } else {
      // 如果点击的音乐不是当前播放的音乐
      if (audioContext) {
        audioContext.src = item.src;
        audioContext.play();
        setCurrent(item);
        setProgress(0);
        setIsPlaying(true);
      }
    }
  };

  return (
    <View className="music-page">
      <View className="music-list">
        {musicList.map((item) => (
          <View key={item.id} className="music-item">
            <Image src={item.cover} className="music-cover" />
            <View className="music-info">
              <Text className="music-title">{item.title}</Text>
              <Text className="music-artist">{item.artist}</Text>
            </View>
            <View className="music-control">
              <View onClick={() => handlePlay(item)}>
                <AtIcon
                  value={
                    current?.id === item.id
                      ? isPlaying
                        ? "pause"
                        : "play"
                      : "play"
                  }
                  size="28"
                  color="#fd3d4a"
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Music;
