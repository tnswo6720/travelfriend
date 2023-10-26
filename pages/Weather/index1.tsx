import React, { useState, useEffect } from "react";

interface Weather {
  main: string;
  description: string; // 추가된 부분
  icon: string;
}

interface Main {
  temp: number;
}

interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
}

export default function WeatherComponent(): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const getPosition = async (): Promise<GeolocationPosition> =>
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

    const fetchData = async (): Promise<void> => {
      try {
        const position = await getPosition();
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a0fe4b649d353a27a301be4b66d4173c&units=metric&lang=kr`
        );

        const data: WeatherData = await response.json();

        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchData();
  }, []);

  if (weatherData === null) return <div>Loading...</div>;

  return (
    <div>
      <h1>{weatherData.name}</h1>
      <h2>{weatherData.weather[0].description}</h2>{" "}
      {/* 날씨 상태 메시지 출력 부분 수정 */}
      <p>{weatherData.main.temp}°C</p> {/* 현재 온도 */}
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="날씨 상태 아이콘"
      />
    </div>
  );
}
