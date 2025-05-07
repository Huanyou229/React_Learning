import React from "react";
import { Carousel, Card, Tag } from "antd";
import { carouselData, cardData } from "@/data/homeData";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* 走马灯部分 */}
      <Carousel autoplay className="mb-8">
        {carouselData.map((item) => (
          <div key={item.id}>
            <div
              className="relative h-[500px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4 text-center backdrop-blur-sm bg-white/10 px-6 py-2 rounded-lg">
                  {item.title}
                </h2>
                <p className="text-xl text-center max-w-2xl backdrop-blur-sm bg-white/10 px-6 py-2 rounded-lg">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 卡片部分 */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          软件工程知识库
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => (
            <Card
              key={card.id}
              hoverable
              cover={
                <div className="h-48 w-full overflow-hidden">
                  <img
                    alt={card.title}
                    src={card.image}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              }
              className="backdrop-blur-lg bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Card.Meta
                title={
                  <span className="text-xl font-semibold">{card.title}</span>
                }
                description={
                  <div>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <Tag
                          key={tag}
                          className="bg-blue-50 text-blue-600 border-blue-200"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
