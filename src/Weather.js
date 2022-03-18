import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  const [temperature, setTemperature] = useState(" ");

  const [humidity, setHumididty] = useState(" ");
  const [wind, setWind] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [icon, setIcon] = useState(" ");
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState(false);
  function showWeather(response) {
    console.log(response.data);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather.description);
    setHumididty(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    setWeather(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ced540f5728f0002c753875787475e3a&units=metric`;
    console.log(url);
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (weather) {
    return (
      <div className="weather">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter city here"
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>

        <br />
        <ul className="displayWeather">
          <li> Temperature:{Math.round(temperature)}°C </li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind:{Math.round(wind)}km/h</li>
          <li>
            <img src={icon} alt={icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="weather">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter city here"
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
