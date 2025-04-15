import { useState } from "react";
import {
  View,
  ScrollView,
  Swiper,
  SwiperItem,
  CoverView,
  Image,
} from "@tarojs/components";
import "./index.scss";

const Container = () => {
  const swiperImages = [
    "https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/1.jpg",
    "https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/2.jpg",
    "https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/3.jpg",
  ];

  const [listItems, setListItems] = useState(
    Array.from({ length: 20 }, (_, i) => `列表项 ${i + 1}`)
  );
  const [refresherTriggered, setRefresherTriggered] = useState(false); // 控制刷新状态
  const [loading, setLoading] = useState(false); // 控制上拉加载
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

  // 下拉刷新处理函数
  const handleRefresh = () => {
    setRefresherTriggered(true); // 设置为正在刷新
    setTimeout(() => {
      // 模拟刷新后的数据
      setListItems([
        `刷新时间：${new Date().toLocaleTimeString()}`,
        ...listItems,
      ]);
      setRefresherTriggered(false); // 刷新完成
    }, 1000);
  };

  // 上拉加载更多
  const onLoadMore = () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from(
        { length: 10 },
        (_, i) => `新列表项 ${listItems.length + i + 1}`
      );
      setListItems([...listItems, ...newItems]);
      setLoading(false);

      if (listItems.length + newItems.length >= 50) {
        setHasMore(false); // 达到加载上限
      }
    }, 1000);
  };

  return (
    <View className="container">
      {/* ScrollView 可滚动列表 + 下拉刷新 */}
      <View className="section">
        <View className="section-title">ScrollView 滚动视图</View>
        <ScrollView
          className="scroll-view"
          scrollY
          scrollWithAnimation
          refresherEnabled // 开启原生下拉刷新
          refresherTriggered={refresherTriggered} // 控制刷新状态
          onRefresherRefresh={handleRefresh} // 刷新触发
          onScrollToLower={onLoadMore} // 上拉触底加载更多
        >
          {listItems.map((item, index) => (
            <View key={index} className="scroll-item">
              {item}
            </View>
          ))}
          {loading && <View className="loading">加载中...</View>}
          {!hasMore && <View className="no-more">没有更多数据了</View>}
        </ScrollView>
      </View>

      {/* Swiper 轮播图 */}
      <View className="section">
        <View className="section-title">Swiper 轮播图</View>
        <Swiper
          className="swiper"
          indicatorDots
          autoplay
          interval={3000}
          circular
        >
          {swiperImages.map((image, index) => (
            <SwiperItem key={index}>
              <Image className="swiper-image" src={image} mode="aspectFill" />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      {/* CoverView 组件 */}
      <View className="section">
        <View className="section-title">CoverView 示例</View>
        <View className="cover-container">
          <Image
            className="background-image"
            src="https://mqxu-oss.oss-cn-hangzhou.aliyuncs.com/banner/1.jpg"
            mode="aspectFill"
          />
          <CoverView className="cover-view">
            <CoverView className="cover-text">这是一个CoverView示例</CoverView>
            <CoverView className="cover-description">
              CoverView可以覆盖在原生组件上
            </CoverView>
          </CoverView>
        </View>
      </View>
    </View>
  );
};

export default Container;
