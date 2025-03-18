import { get } from "./request";

const API_KEY = "50d0eebb934f034dc7dbbb2bfd0b0cc6";
const BASE_URL = "https://apis.tianapi.com";

/**
 * 获取电影列表
 * @param {number} num - 获取的电影数量
 * @returns {Promise} 返回电影列表数据
 */
export const getMovieList = async (num = 24) => {
  return get(`${BASE_URL}/film/index?key=${API_KEY}&num=${num}`);
};

/**
 * 获取电影详情
 * @param {string} id - 电影ID
 * @returns {Promise} 返回电影详情数据
 */
export const getMovieDetail = async (id) => {
  try {
    const response = await get(`${BASE_URL}/film/index?key=${API_KEY}&num=24`);
    const movie = response.result.newslist.find((item) => item.id === id);
    if (!movie) {
      throw new Error("电影信息不存在");
    }
    return { result: movie };
  } catch (error) {
    throw new Error(`获取电影详情失败: ${error.message}`);
  }
};
