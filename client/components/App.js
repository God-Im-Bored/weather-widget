import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import { fetchLocale } from "../data.js";
import regeneratorRuntime from "regenerator-runtime";
import {
  WiCloudy,
  WiRaindrops,
  WiRain,
  WiDaySunny,
  WiSnow,
  WiThunderstorm,
  WiDirectionDown,
  WiDirectionUp,
  WiSunrise,
  WiSunset,
} from "weather-icons-react";

const api = {
  key: "c9657622c49b4e5a1e7254bbe26f56ed",
  path: "https://api.openweathermap.org/data/2.5/",
};
const { key, path } = api;

const icons = {
  clouds: <WiCloudy size={75} color="#FFF" />,
  drizzle: <WiRaindrops size={75} color="#FFF" />,
  rain: <WiRain size={75} color="#FFF" />,
  clear: <WiDaySunny size={75} color="#FFF" />,
  snow: <WiSnow size={75} color="#FFF" />,
  thunderstorm: <WiThunderstorm size={75} color="#FFF" />,
};

const { clouds, drizzle, rain, clear, snow, thunderstrom } = icons;

const App = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState({});
  const [locale, setLocale] = useState({});
  const [weather, setWeather] = useState({});
  const degree = "°F";
  let options = {
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setLocale(await fetchLocale());
      setWeather(await fetchLocale());
    };

    fetchAPI();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const res = await fetch(
          `${path}weather?q=${city}&units=imperial&APPID=${key}`
        );
        const forecast = await res.json();
        await setForecast(forecast);

        setCity("");
      } catch (err) {
        console.log("GET request failed", err);
      }
    }
  };

  const getDate = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
  };

  return (
    <div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {typeof forecast.main != "undefined" ? (
          <div
            className={
              typeof forecast.main !== "undefined" && forecast
                ? forecast.weather[0].main === "Clear"
                  ? "app-body-clear"
                  : forecast.weather[0].main === "Rain"
                  ? "app-body-rain"
                  : forecast.weather[0].main === "Drizzle"
                  ? "app-body-drizzle"
                  : forecast.weather[0].main === "Thunderstorm"
                  ? "app-body-tunderstorm"
                  : forecast.weather[0].main === "Snow"
                  ? "app-body-snow"
                  : forecast.weather[0].main === "Clouds"
                  ? "app-body-cloudy"
                  : "app-body-main"
                : "app-body-main"
            }
          >
            <div className="location-body">
              <div className="time-body">
                <div className="time">
                  {new Intl.DateTimeFormat([], options).format(new Date())}
                </div>
                <div className="day">{getDate(new Date())}</div>
              </div>

              <div className="location">
                {forecast.name}, {forecast.sys.country}{" "}
              </div>
            </div>

            <div className="weather-body">
              <div className="temp">
                {Math.ceil(forecast.main.temp)}
                {degree}
              </div>

              <div className="weather-desc">{forecast.weather[0].main}</div>
              <div className="png">
                <div id="icon">
                  {typeof forecast.main !== "undefined" ? (
                    forecast.weather[0].main === "Clear" ? (
                      clear
                    ) : forecast.weather[0].main === "Rain" ? (
                      rain
                    ) : forecast.weather[0].main === "Drizzle" ? (
                      drizzle
                    ) : forecast.weather[0].main === "Clouds" ? (
                      clouds
                    ) : forecast.weather[0].main === "Thunderstorm" ? (
                      thunderstrom
                    ) : forecast.weather[0].main === "Snow" ? (
                      snow
                    ) : (
                      <img src="/weather-man.png"></img>
                    )
                  ) : (
                    <img src="/weather-man.png"></img>
                  )}
                </div>
              </div>
              <div className="weather-info">
                <div>
                  Feels Like: {Math.ceil(forecast.main.feels_like)}
                  {degree}
                </div>

                <div>
                  <span>
                    H<WiDirectionUp size={15} color="#FFF" />{" "}
                    {Math.ceil(forecast.main.temp_max)}
                    {degree}
                  </span>
                  <br></br>
                  <span>
                    L<WiDirectionDown size={20} color="#FFF" />
                    {Math.ceil(forecast.main.temp_min)}
                    {degree}
                  </span>
                </div>

                <h3>
                  <WiSunrise size={35} color="#FFF" />
                  Sunrise:{" "}
                  {new Date(forecast.sys.sunrise * 1000).toLocaleTimeString()}
                </h3>
                <h3>
                  <WiSunset size={35} color="#FFF" />
                  Sunset:{" "}
                  {new Date(forecast.sys.sunset * 1000).toLocaleTimeString()}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              typeof locale.main !== "undefined" && locale
                ? locale.weather[0].main === "Clear"
                  ? "app-body-clear"
                  : locale.weather[0].main === "Rain"
                  ? "app-body-rain"
                  : locale.weather[0].main === "Drizzle"
                  ? "app-body-drizzle"
                  : locale.weather[0].main === "Thunderstorm"
                  ? "app-body-tunderstorm"
                  : locale.weather[0].main === "Snow"
                  ? "app-body-snow"
                  : locale.weather[0].main === "Clouds"
                  ? "app-body-cloudy"
                  : "app-body-main"
                : "app-body-main"
            }
          >
            {typeof locale.main != "undefined" && locale.sys ? (
              <div>
                <div className="location-body">
                  <div className="time-body">
                    <div className="time">
                      {new Intl.DateTimeFormat([], options).format(new Date())}
                    </div>
                    <div className="day">{getDate(new Date())}</div>
                  </div>

                  <div className="location">
                    {locale.name}, {locale.sys.country}{" "}
                  </div>
                </div>

                <div className="weather-body">
                  <div className="temp">
                    {Math.ceil(locale.main.temp)}
                    {degree}
                  </div>

                  <div className="weather-desc">{locale.weather[0].main}</div>
                  <div className="png">
                    <div id="icon">
                      {typeof locale.main !== "undefined" ? (
                        locale.weather[0].main === "Clear" ? (
                          clear
                        ) : locale.weather[0].main === "Rain" ? (
                          rain
                        ) : locale.weather[0].main === "Drizzle" ? (
                          drizzle
                        ) : locale.weather[0].main === "Clouds" ? (
                          clouds
                        ) : locale.weather[0].main === "Thunderstorm" ? (
                          thunderstrom
                        ) : locale.weather[0].main === "Snow" ? (
                          snow
                        ) : (
                          <img src="/weather-man.png"></img>
                        )
                      ) : (
                        <img src="/weather-man.png"></img>
                      )}
                    </div>
                  </div>
                  <div className="weather-info">
                    <div>
                      Feels Like: {Math.ceil(locale.main.feels_like)}
                      {degree}
                    </div>

                    <div>
                      <span>
                        H<WiDirectionUp size={15} color="#FFF" />{" "}
                        {Math.ceil(locale.main.temp_max)}
                        {degree}
                      </span>
                      <br></br>
                      <span>
                        L<WiDirectionDown size={20} color="#FFF" />
                        {Math.ceil(locale.main.temp_min)}
                        {degree}
                      </span>
                    </div>

                    <h3>
                      <WiSunrise size={35} color="#FFF" />
                      Sunrise:{" "}
                      {new Date(locale.sys.sunrise * 1000).toLocaleTimeString()}
                    </h3>
                    <h3>
                      <WiSunset size={35} color="#FFF" />
                      Sunset:{" "}
                      {new Date(locale.sys.sunset * 1000).toLocaleTimeString()}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="instructions">
                Search the name of a city to find the corresponding forecast.{" "}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
