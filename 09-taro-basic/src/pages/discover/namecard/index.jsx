import { View } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtCard } from "taro-ui";
import "./index.scss";

import { useState } from "react";
import NameCard from "./NameCard";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    position: "",
    company: "",
    email: "",
  });

  const [cardInfo, setCardInfo] = useState(null);

  const handleInputChange = (key) => (value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const generateCard = () => {
    setCardInfo({ ...formData });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      phone: "",
      position: "",
      company: "",
      email: "",
    });
    setCardInfo(null);
  };

  const handleGenerateCard = () => {
    generateCard();
  };

  return (
    <View className="index">
      <AtForm>
        <AtInput
          name="name"
          title="姓名"
          type="text"
          placeholder="请输入姓名"
          value={formData.name}
          onChange={handleInputChange("name")}
        />
        <AtInput
          name="phone"
          title="手机号"
          type="text"
          placeholder="请输入手机号"
          value={formData.phone}
          onChange={handleInputChange("phone")}
        />
        <AtInput
          name="position"
          title="职位"
          type="text"
          placeholder="请输入职位"
          value={formData.position}
          onChange={handleInputChange("position")}
        />
        <AtInput
          name="company"
          title="公司"
          type="text"
          placeholder="请输入公司"
          value={formData.company}
          onChange={handleInputChange("company")}
        />
        <AtInput
          name="email"
          title="邮箱"
          type="text"
          placeholder="请输入邮箱"
          value={formData.email}
          onChange={handleInputChange("email")}
        />
      </AtForm>
      <View className="button-group">
        <AtButton type="primary" onClick={handleGenerateCard}>
          生成名片
        </AtButton>
        <AtButton onClick={clearForm}>清空</AtButton>
      </View>
      {cardInfo && (
        <AtCard title="个人名片" className="name-card-container">
          <NameCard cardInfo={cardInfo} />
        </AtCard>
      )}
    </View>
  );
}
