import { useState, useEffect, useCallback } from "react";

const Weather = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("320113");

  const fetchWeather = useCallback(async () => {
    try {
      const response = await fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=a7ec78707266f56f95188d6156edb56d&city=${city}`
      );
      if (!response.ok) {
        throw new Error("网络请求错误");
      }
      const json = await response.json();
      if (json.status === "1" && json.lives) {
        setData(json.lives[0]);
      } else {
        setError(json.info || "获取数据失败");
      }
    } catch (error) {
      setError(error.message);
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>正在加载中...</p>;

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>查询天气</button>
      <h1>城市名：{data.city}</h1>
      <p>天气现象: {data.weather}</p>
      <p>实时气温: {data.temperature}℃</p>
      <p>空气湿度: {data.humidity}%</p>
      <p>风向描述: {data.winddirection}</p>
      <p>风力等级: {data.windpower}</p>
      <p>数据发布时间: {data.reporttime}</p>
    </div>
  );
};

export default Weather;
