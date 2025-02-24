import MyCard from "../components/my-card/MyCard"; // 引入 MyCard 组件

const MainProductList = () => {
  const products = [
    {
      name: "张三",
      image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/11.jpg",
      description: "2205221101",
    },
    {
      name: "张三风",
      image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/12.jpg",
      description: "2205221102",
    },
    {
      name: "张三丰",
      image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/13.jpg",
      description: "2205221103",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          margin: "20px auto",
          justifyContent: "center",
        }}
      >
        {products.map((item, index) => (
          <MyCard
            key={index}
            image={item.image}
            name={item.name}
            pref={item.description}
            style={{ marginBottom: "16px" }}
          />
        ))}
      </div>
    </>
  );
};

export default MainProductList;
