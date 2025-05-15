import React from "react";
import { Layout, Divider } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Layout>
      <Footer className="flex justify-center items-center bg-white ">
        <div className="flex items-center space-x-4">
          <div href="# " className="flex item-center text-black font-bold">
            <img src="/yuque.svg" alt="羽雀" className="h-6" />
            <div className="font-medium text-base ml-1">羽雀</div>
          </div>
          <Divider type="vertical" />
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-black">
              关于语雀
            </a>
            <Divider type="vertical" />
            <a href="#" className="text-gray-500 hover:text-black ">
              使用帮助
            </a>
            <Divider type="vertical" />
            <a href="#" className="text-gray-500 hover:text-black">
              数据安全
            </a>
            <Divider type="vertical" />
            <a href="#" className="text-gray-500 hover:text-black">
              服务协议
            </a>
            <Divider type="vertical" />
            <a href="#" className="text-gray-500 hover:text-black">
              English
            </a>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default FooterComponent;
