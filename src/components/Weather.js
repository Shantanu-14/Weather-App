import React, { useState, useEffect } from "react";
import "./Weather.css";
import WeatherCard from "./WeatherCard";
const Weather = () => {
  const [city, setCity] = useState("Hyderabad");
    const [info, setInfo] = useState({});
    const getWeatherInfo = async () => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3abc69fb1fc55cbba8c485897d4f0589`;
        const res = await fetch(url);
        const data = await res.json();
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;
  
        const WeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset
        };
        setInfo(WeatherInfo)
  
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    getWeatherInfo();
  },[]);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            autoFocus
            placeholder="Search ..."
            id="search"
            className="searchTerm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard info={info }/>
    </>
  );
};

export default Weather;
