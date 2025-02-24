import { Carousel } from "antd";
import PropTypes from "prop-types";
const MainBanner = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  // 定义图片组件的生成函数
  const ImageItem = ({ src, alt }) => (
    <div>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "350px", objectFit: "cover" }}
      />
    </div>
  );
  ImageItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  // 图片数据
  const images = [
    {
      src: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/z1.jpg",
      alt: "Slide 1",
    },
    {
      src: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/z3.jpg",
      alt: "Slide 2",
    },
    {
      src: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/z4.jpg",
      alt: "Slide 3",
    },
    {
      src: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/images/z5.jpg",
      alt: "Slide 4",
    },
  ];

  return (
    <Carousel afterChange={onChange}>
      {images.map((image, index) => (
        <ImageItem key={index} src={image.src} alt={image.alt} />
      ))}
    </Carousel>
  );
};

export default MainBanner;
