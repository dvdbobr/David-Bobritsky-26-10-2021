import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather } from "../../redux/actions/weatherActions";
import "./mainContainer.css";
import ForecastCards from "../forecastCard/ForecastCards";
import LikeButton from "../likeButton/LikeButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import axios from "axios";

export default function MainContainer() {
  const dispatch = useDispatch();
  const currentWeatherData = useSelector((state) => state.currentWeather);
  const { loading, error, currentWeather } = currentWeatherData;
  const currentTheme = useSelector((state) => state.theme.theme);
  const currentDegreeUnit = useSelector((state) => state.theme.degreeUnit);
  const params = useParams();

  useEffect(() => {
    if (params.cityKey) {
      dispatch(getCurrentWeather(params.cityKey, params.cityName));
    } else {
      currentWeather
        ? dispatch(getCurrentWeather(currentWeather.cityKey,currentWeather.cityName))
        : dispatch(getCurrentWeather("215854"));
    }
  }, [dispatch]);
  return (
    <div
      className={`mainContainer ${
        currentTheme === "dark" ? "darkModeMainContaier" : ""
      }`}
    >
      <div className="mainContainerTopRow">
        <div className="degrees">
          <h2>{loading ? null : currentWeather?.cityName}</h2>
          <span className="degrees">
            {loading ? null : error ? (
              null
            ) : (
              <span>
                {currentWeather?.details
                  ? currentDegreeUnit === "fahrenheit"
                    ? `${Math.round(
                        currentWeather?.details?.Temperature.Imperial.Value
                      )}F°`
                    : `${Math.round(
                        ((currentWeather?.details?.Temperature.Imperial.Value -
                          32) *
                          5) /
                          9
                      )}C°`
                  : null}
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
          null
        ) : (
          currentWeather.details?.WeatherText
        )}
      </h1>
      <ForecastCards />
    </div>
  );
}
