import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../../redux/actions/weatherActions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./favoritesCards.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { removeFromFavorites } from "../../redux/actions/favoritesActions";

export default function FavoritesCards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector((state) => state.favorites.favorites);
  const openFavorite = (cityName, cityKey) => {
    history.push(`/details/${cityName}/${cityKey}`);
  };
  const removeFavorite = (cityKey) => {
    dispatch(removeFromFavorites(cityKey));
  };
  useEffect(() => {
    // dispatch(getForecast("215854"));
  }, [favorites]);
  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        favorites?.map((c) => {
          return (
            <div className="favoriteCard" key={c.cityKey}>
              <span className="removeFav">
                <HighlightOffIcon
                  onClick={() => removeFavorite(c.cityKey)}
                  style={{ color: "#1976d2" }}
                />
              </span>
              <span>{c.cityName}</span>
              <span>{c.details.Temperature.Imperial.Value}F&deg;</span>
              <span>{c.details.WeatherText}</span>
              <Button
                onClick={() => openFavorite(c.cityName, c.cityKey)}
                variant="outlined"
              >
                OPEN
              </Button>
            </div>
          );
        })
      ) : (
        <h1>No Favorites Added Yet</h1>
      )}
    </div>
  );
}
