const blogs = [
  {
    id: 1,
    title: "前端工程化入门：构建工具的选择与使用",
    description:
      "介绍了前端工程化中常见的构建工具，如 Webpack、Vite 等，并对比了它们的特点和适用场景。",
    author: "张三",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/1.webp", // 示例图片链接，实际使用时替换为真实图片链接
    views: 1200,
    favorites: 60,
    likes: 150,
    tags: ["前端工程化", "构建工具", "Webpack", "Vite"],
  },
  {
    id: 2,
    title: "代码规范与审查：前端团队的高效协作利器",
    description:
      "探讨了前端代码规范的重要性，以及如何通过代码审查来提升代码质量和团队协作效率。",
    author: "李四",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/2.webp",
    views: 800,
    favorites: 40,
    likes: 90,
    tags: ["前端工程化", "代码规范", "代码审查", "团队协作"],
  },
  {
    id: 3,
    title: "前端性能优化：从加载速度到用户体验",
    description:
      "分享了前端性能优化的多种方法，包括资源压缩、懒加载、缓存策略等，以及如何通过这些手段提升用户体验。",
    author: "王五",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/2.webp",
    views: 1500,
    favorites: 80,
    likes: 200,
    tags: ["前端工程化", "性能优化", "加载速度", "用户体验"],
  },
  {
    id: 4,
    title: "前端工程化实践：组件库的构建与维护",
    description:
      "讲解了如何构建一个可复用的前端组件库，以及在维护过程中需要注意的版本管理、文档编写等问题。",
    author: "赵六",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/1.webp",
    views: 1000,
    favorites: 50,
    likes: 120,
    tags: ["前端工程化", "组件库", "版本管理", "文档编写"],
  },
  {
    id: 5,
    title: "前端工程化中的自动化测试策略",
    description:
      "介绍了前端自动化测试的重要性，以及如何通过单元测试、端到端测试等手段保障代码质量。",
    author: "孙七",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/2.webp",
    views: 900,
    favorites: 45,
    likes: 110,
    tags: ["前端工程化", "自动化测试", "单元测试", "端到端测试"],
  },
  {
    id: 6,
    title: "前端工程化与持续集成/持续部署（CI/CD）",
    description:
      "探讨了如何将前端工程化与 CI/CD 流程相结合，实现代码的自动化构建、测试和部署。",
    author: "周八",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/1.webp",
    views: 1300,
    favorites: 70,
    likes: 180,
    tags: ["前端工程化", "CI/CD", "自动化部署", "持续集成"],
  },
  {
    id: 7,
    title: "前端工程化中的状态管理方案",
    description:
      "分析了前端状态管理的常见问题，并介绍了 Redux、Vuex 等状态管理工具的使用方法和最佳实践。",
    author: "吴九",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/2.webp",
    views: 1100,
    favorites: 65,
    likes: 140,
    tags: ["前端工程化", "状态管理", "Redux", "Vuex"],
  },
  {
    id: 8,
    title: "前端工程化中的代码分割与懒加载",
    description:
      "详细介绍了代码分割和懒加载的原理，以及如何在项目中实现它们以优化应用性能。",
    author: "郑十",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/1.webp",
    views: 1400,
    favorites: 90,
    likes: 210,
    tags: ["前端工程化", "代码分割", "懒加载", "性能优化"],
  },
  {
    id: 9,
    title: "前端工程化中的跨域问题解决方案",
    description:
      "探讨了前端开发中常见的跨域问题，以及如何通过代理、CORS 等方式解决这些问题。",
    author: "钱十一",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/2.webp",
    views: 1000,
    favorites: 55,
    likes: 130,
    tags: ["前端工程化", "跨域问题", "代理", "CORS"],
  },
  {
    id: 10,
    title: "前端工程化的未来趋势与挑战",
    description:
      "对前端工程化的未来发展趋势进行了展望，并分析了当前面临的挑战和应对策略。",
    author: "孔十二",
    image: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/qd/2.webp",

    views: 1600,
    favorites: 100,
    likes: 230,
    tags: ["前端工程化", "未来趋势", "挑战", "应对策略"],
  },
];

export default blogs;
