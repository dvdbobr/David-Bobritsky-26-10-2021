import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../../redux/actions/weatherActions";
import "./forecastCards.css";

export default function ForecastCards() {
  const dispatch = useDispatch();
  const forecastData = useSelector((state) => state.forecast);
  const { loading, error, forecast } = forecastData;

  const dayOfWeek = (forecastDate) => {
    const date = new Date(forecastDate.slice(0, forecastDate.indexOf("T")));
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  useEffect(() => {
    dispatch(getForecast("215854"));
    console.log(forecast);
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
              <span>{dayOfWeek(card.Date)}</span>
              <span>
                {card.Temperature.Minimum.Value}F&deg; -
                {card.Temperature.Maximum.Value}F&deg;
              </span>
              <span>Day: {card.Day.IconPhrase}</span>
              <span>Night: {card.Night.IconPhrase}</span>
              <p>{card.age}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
