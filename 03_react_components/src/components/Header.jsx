import { useState } from "react";
import { HomeOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    label: "首页",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "邮件",
    key: "email",
    icon: <MailOutlined />,
  },
  {
    label: "设置",
    key: "setting",
    icon: <SettingOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ backgroundColor: "pink" }}
    />
  );
};
export default Header;
