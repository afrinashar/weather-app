import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TiWeatherCloudy,
  TiWeatherSnow,
  TiWeatherSunny,
  TiWeatherPartlySunny,
} from "react-icons/ti";
import "./App.css";

const apiKey = "YOUR_API_KEY"; // Replace with your API key

const App = () => {
  const [weather, setWeather] = useState(null);
  const [tempUnit, setTempUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    // Function to fetch weather data based on user's geolocation
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(
          `https://weather-proxy.freecodecamp.rocks/api/current?units=${tempUnit}&appid=${apiKey}`
        );
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [tempUnit]);

  const handleUnitToggle = () => {
    setTempUnit(tempUnit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="weather-container">
          {weather ? (
            <>
              <div className="location">
                <h2>{`${weather.name}, ${weather.sys.country}`}</h2>
              </div>
              <div className="weather">
                <div className="weather-icon">
                  {weather.weather[0].main === "Clouds" && <TiWeatherCloudy />}
                  {weather.weather[0].main === "Snow" && <TiWeatherSnow />}
                  {weather.weather[0].main === "Clear" && <TiWeatherSunny />}
                  {weather.weather[0].main === "Sunny" && <TiWeatherSunny />}
                  {weather.weather[0].main === "Partly Cloudy" && (
                    <TiWeatherPartlySunny />
                  )}
                </div>
                <div className="temperature">
                  <h1>{Math.round(weather.main.temp)}°</h1>
                  <button onClick={handleUnitToggle}>Toggle °C / °F</button>
                </div>
              </div>
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
