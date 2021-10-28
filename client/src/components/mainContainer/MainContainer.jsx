import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather } from "../../redux/actions/weatherActions";
import "./mainContainer.css";
import ForecastCards from "../forecastCard/ForecastCards";
import LikeButton from "../likeButton/LikeButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";

export default function MainContainer() {
  const dispatch = useDispatch();
  const currentWeatherData = useSelector((state) => state.currentWeather);
  const { loading, error, currentWeather } = currentWeatherData;
  const [degreeUnit, setDegreeUnit] = useState("fahrenheit");
  const params = useParams();

  useEffect(() => {
    console.log(params.cityKey);
    // setLiked(
    //   favorites.filter((c) => c.cityKey === currentWeather.cityKey).length
    // );
    if (params.cityKey) {
      dispatch(getCurrentWeather(params.cityKey, params.cityName));
    } else {
      currentWeather.cityKey
        ? dispatch(
            getCurrentWeather(currentWeather.cityKey, currentWeather.cityName)
          )
        : dispatch(getCurrentWeather("215854", "Tel Aviv"));
    }
  }, []);
  return (
    <div className="mainContainer">
      <div className="mainContainerTopRow">
        <div className="degrees">
          <h2>{currentWeather?.cityName}</h2>
          <span className="degrees">
            {loading ? null : error ? (
              <h1>{error}</h1>
            ) : (
              <span>
                {Math.round(
                  currentWeather?.details?.Temperature.Imperial.Value
                )}
                {degreeUnit === "celsius" ? "C" : "F"}
                &deg;
              </span>
            )}
          </span>
        </div>
        <LikeButton />
      </div>
      <h1 className="mainWeatherText">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <h1>error</h1>
        ) : (
          currentWeather.details?.WeatherText
        )}
      </h1>
      <ForecastCards />
    </div>
  );
}
