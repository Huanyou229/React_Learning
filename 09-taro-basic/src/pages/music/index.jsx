import { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtIcon, AtSlider } from "taro-ui";
import Taro from "@tarojs/taro";
import { musicList } from "./musicData";
import "./index.scss";

const Music = () => {
  const [current, setCurrent] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = Taro.createInnerAudioContext();
    setAudioContext(audio);

    audio.onTimeUpdate(() => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    });

    return () => {
      audio.destroy();
    };
  }, []);

  const handlePlay = (item) => {
    if (current?.id === item.id) {
      if (!isPlaying) {
        audioContext.play();
        setIsPlaying(true);
      } else {
        audioContext.pause();
        setIsPlaying(false);
      }
    } else {
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
