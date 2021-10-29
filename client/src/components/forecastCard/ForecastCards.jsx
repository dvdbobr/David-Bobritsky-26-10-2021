import React, { useEffect } from "react";
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
  const currentTheme = useSelector((state) => state.theme.theme);
  const currentDegreeUnit = useSelector((state) => state.theme.degreeUnit);

  const dayOfWeek = (forecastDate) => {
    const date = new Date(forecastDate.slice(0, forecastDate.indexOf("T")));
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  useEffect(() => {
    if (params.cityKey) {
      dispatch(getForecast(params.cityKey));
    } else {
      currentWeather.cityKey
        ? dispatch(getForecast(currentWeather.cityKey))
        : dispatch(getForecast("215854"));
    }
  }, [dispatch]);
  return (
    <div className="forecastCardRow">
      {loading ? null : error ? (
        <h2
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {error.message}
        </h2>
      ) : (
        forecast?.DailyForecasts?.map((card) => {
          return (
            <div
              className={`forecastCardContainer ${
                currentTheme === "dark" ? "darkModeForecast" : ""
              }`}
            >
              <div className="forecastCardDay">
                <span>{dayOfWeek(card.Date)}</span>
              </div>

              <span className="forecastCardDegrees">
                {currentDegreeUnit === "fahrenheit"
                  ? `${card.Temperature.Minimum.Value}F°/${card.Temperature.Maximum.Value}F°`
                  : `${Math.round(
                      ((card.Temperature.Minimum.Value - 32) * 5) / 9
                    )}C°/${Math.round(
                      ((card.Temperature.Maximum.Value - 32) * 5) / 9
                    )}C°`}
              </span>
              <span>{card.Day.IconPhrase}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
