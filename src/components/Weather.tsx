import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "973fff3498ae9327464ee9d4138e5f7c"; // Thay bằng API Key của bạn

  const cities = [
    "Hanoi",
    "Ho Chi Minh",
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Berlin",
    "Dubai",
    "Rome",
    "Los Angeles",
    "Barcelona",
    "Moscow",
    "Singapore",
    "Kuala Lumpur",
    "Bangkok",
    "Seoul",
    "Shanghai",
    "Mexico City",
    "Istanbul",
    "Cairo",
    "Rio de Janeiro",
    "Athens",
    "Sao Paulo",
    "Mumbai",
    "Beijing",
    "Lagos",
    "Buenos Aires",
    "Amsterdam",
    "Toronto",
    "Hong Kong",
    "San Francisco",
    "Cape Town",
    "Oslo",
    "Vienna",
    "Stockholm",
    "Madrid",
    "Milan",
    "Warsaw",
    "Jakarta",
    "Tel Aviv",
    "Chicago",
    "Brisbane",
  ];

  const fetchWeather = async () => {
    if (!city) {
      setError("Select a city!"); // Thông báo lỗi nếu chưa chọn thành phố
      return;
    }

    try {
      setError(""); // Reset lỗi
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=en`
      );

      if (!response.ok) throw new Error("City not found!");

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  // Mã icon OpenWeatherMap
  const getIcon = (icon) => {
    switch (icon) {
      case "01d":
        return <FontAwesomeIcon icon={faSun} className="weather-icon" />;
      case "02d":
      case "02n":
        return <FontAwesomeIcon icon={faCloudSun} className="weather-icon" />;
      case "03d":
      case "03n":
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
      case "04d":
      case "04n":
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
      case "09d":
      case "09n":
        return <FontAwesomeIcon icon={faCloudRain} className="weather-icon" />;
      case "10d":
      case "10n":
        return <FontAwesomeIcon icon={faCloudRain} className="weather-icon" />;
      case "13d":
      case "13n":
        return <FontAwesomeIcon icon={faSnowflake} className="weather-icon" />;
      case "50d":
      case "50n":
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
      default:
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="city-dropdown"
      >
        <option value="">Select a city</option>
        {cities.map((cityName, index) => (
          <option key={index} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <button onClick={fetchWeather} className="weather-button">
        Get Weather
      </button>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <div className="weather-condition">
            {/* Hiển thị icon */}
            {getIcon(weatherData.weather[0].icon)}
            <p>
              Temperature: <span>{weatherData.main.temp}°C</span>
            </p>
            <p>
              Humidity: <span>{weatherData.main.humidity}%</span>
            </p>
            <p>
              Condition: <span>{weatherData.weather[0].description}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
