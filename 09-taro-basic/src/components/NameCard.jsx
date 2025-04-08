import { View, Image } from "@tarojs/components";

const NameCard = ({ cardInfo }) => {
  return (
    <View className="card-content">
      <Image
        className="avatar"
        src="https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/avatar/zhy.jpg"
      />
      <View className="info-item name">姓名：{cardInfo.name}</View>
      <View className="info-item">联系方式：{cardInfo.phone}</View>
      <View className="info-item">职位：{cardInfo.position}</View>
      <View className="info-item">公司：{cardInfo.company}</View>
      <View className="info-item">邮箱：{cardInfo.email}</View>
    </View>
  );
};

export default NameCard;
