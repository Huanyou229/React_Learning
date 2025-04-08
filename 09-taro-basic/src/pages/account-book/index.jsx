import { View, Text } from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtFloatLayout, AtInput } from "taro-ui";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/categories";
import "./index.scss";

export default function AccountBook() {
  const [selectedType, setSelectedType] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFloatLayoutOpen, setIsFloatLayoutOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(500);
  const [records, setRecords] = useState([]);

  const categories =
    selectedType === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <View className="index">
      <View className="type-selector">
        <View
          className={`type-item ${selectedType === "expense" ? "active" : ""}`}
          onClick={() => setSelectedType("expense")}
        >
          支出
        </View>
        <View
          className={`type-item ${selectedType === "income" ? "active" : ""}`}
          onClick={() => setSelectedType("income")}
        >
          收入
        </View>
      </View>

      <View className="category-grid">
        {categories.map((category) => (
          <View
            key={category.id}
            className={`category-item ${
              selectedCategory === category.id ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category.id);
              setIsFloatLayoutOpen(true);
            }}
          >
            <Text className="category-icon">{category.icon}</Text>
            <Text className="category-text">{category.text}</Text>
          </View>
        ))}
      </View>

      <AtFloatLayout
        isOpened={isFloatLayoutOpen}
        title="记账"
        scrollY={true}
        onClose={() => {
          setIsFloatLayoutOpen(false);
          setSelectedCategory(null);
          setAmount("");
        }}
      >
        <View className="float-layout-content">
          <AtInput
            name="amount"
            title="金额"
            type="number"
            placeholder="请输入金额"
            value={amount}
            onChange={(value) => setAmount(value)}
          />
          <View className="button-group">
            <Text
              className="confirm-button"
              onClick={() => {
                if (!amount) {
                  Taro.showToast({
                    title: "请输入金额",
                    icon: "none",
                  });
                  return;
                }
                const newRecord = {
                  type: selectedType,
                  category: categories.find((c) => c.id === selectedCategory),
                  amount: parseFloat(amount),
                  time: new Date().toLocaleString(),
                };
                setRecords([newRecord, ...records]);
                setBalance(
                  selectedType === "expense"
                    ? balance - parseFloat(amount)
                    : balance + parseFloat(amount)
                );
                setIsFloatLayoutOpen(false);
                setSelectedCategory(null);
                setAmount("");
              }}
            >
              确认
            </Text>
          </View>

          <View className="records-list">
            <Text className="balance">当前余额: ¥{balance.toFixed(2)}</Text>
            {records.map((record, index) => (
              <View key={index} className="record-item">
                <View className="record-info">
                  <Text className="record-category">
                    {record.category.icon} {record.category.text}
                  </Text>
                  <Text className="record-time">{record.time}</Text>
                </View>
                <Text
                  className={`record-amount ${
                    record.type === "expense" ? "expense" : "income"
                  }`}
                >
                  {record.type === "expense" ? "-" : "+"}¥
                  {record.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </AtFloatLayout>
    </View>
  );
}
