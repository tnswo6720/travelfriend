import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

interface Weather {
  main: string;
  description: string;
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

const WeatherContainer = styled.div`
  background-color: #f5f2fc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 80px;
`;

const CityName = styled.h1`
  color: #4a4a4a;
  font-size: 18px;
`;

const WeatherDescription = styled.h2`
  color: #6c6c6c;
  font-size: 18px;
`;

const Temperature = styled.p`
  color: #888888;
`;

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
    <WeatherContainer>
      <CityName>{weatherData.name}</CityName>
      <WeatherDescription>
        {/* {weatherData.weather[0].description} */}
      </WeatherDescription>
      <Temperature>{weatherData.main.temp}°C</Temperature>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="날씨 상태 아이콘"
      />
    </WeatherContainer>
  );
}
