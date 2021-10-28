import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getForecast } from "../../redux/actions/weatherActions";
import "./forecastCards.css";

export default function ForecastCards() {
  const dispatch = useDispatch();
  const params = useParams();
  const forecastData = useSelector((state) => state.forecast);
  const currentWeather = useSelector(
    (state) => state.currentWeather.currentWeather
  );
  const { loading, error, forecast } = forecastData;

  const dayOfWeek = (forecastDate) => {
    const date = new Date(forecastDate.slice(0, forecastDate.indexOf("T")));
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  useEffect(() => {
    if (params.cityKey) {
      dispatch(getForecast(params.cityKey));
    } else {
      currentWeather
        ? dispatch(getForecast(currentWeather.cityKey))
        : dispatch(getForecast("215854"));
    }

    // console.log(forecast);
  }, [dispatch]);
  return (
    <div className="forecastCardRow">
      {loading ? (
        <h2>spinner</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        forecast?.DailyForecasts?.map((card) => {
          return (
            <div className="forecastCardContainer">
              <div className="forecastCardDay">
                <span>{dayOfWeek(card.Date)}</span>
                {/* <span>
                  {card.Date.slice(0, card.Date.indexOf("T"))
                    .split("-")
                    .reverse()
                    .join("-")}
                </span> */}
              </div>

              <span className="forecastCardDegrees">
                {card.Temperature.Minimum.Value}F&deg;/
                {card.Temperature.Maximum.Value}F&deg;
              </span>
              <span>{card.Day.IconPhrase}</span>
              {/* <span>Night: {card.Night.IconPhrase}</span> */}
            </div>
          );
        })
      )}
    </div>
  );
}
