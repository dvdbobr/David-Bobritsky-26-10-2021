import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather } from "../../redux/actions/weatherActions";
import "./mainContainer.css";
export default function MainContainer() {
  const dispatch = useDispatch();
  const currentWeatherData = useSelector((state) => state.currentWeather);
  const { loading, error, currentWeather } = currentWeatherData;
  const [liked, setLiked] = useState(false);
  const changeLike = () => {
    setLiked(!liked);
  };
  useEffect(() => {
    dispatch(getCurrentWeather("215854"));
  }, [])
  return (
    <div className="mainContainer">
      <div className="mainContainerTopRow">
        <div className="degrees">
          <h2>{currentWeather?.cityName}</h2>
          <span className="degrees">
            {loading ? (
              <h1>spinner</h1>
            ) : error ? (
              <h1>{error}</h1>
            ) : (
              Math.round(currentWeather?.details?.Temperature.Metric.Value)
            )}
            C&deg;
          </span>
        </div>
        <div className="likeBtn">
          {liked ? (
            <IconButton
              aria-label="FavoriteBorderIcon"
              color="error"
              onClick={changeLike}
            >
              <FavoriteIcon style={{ fontSize: 42 }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="FavoriteBorderIcon"
              color="error"
              onClick={changeLike}
            >
              <FavoriteBorderIcon style={{ fontSize: 42 }} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}
