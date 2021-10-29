import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./favoritesCards.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { removeFromFavorites } from "../../redux/actions/favoritesActions";

export default function FavoritesCards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector((state) => state.favorites.favorites);
  const currentTheme = useSelector((state) => state.theme.theme);
  const currentDegreeUnit = useSelector((state) => state.theme.degreeUnit);

  const openFavorite = (cityName, cityKey) => {
    history.push(`/details/${cityName}/${cityKey}`);
  };
  const removeFavorite = (cityKey) => {
    dispatch(removeFromFavorites(cityKey));
  };
  useEffect(() => {
  }, [favorites]);

  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        favorites?.map((c) => {
          return (
            <div
              className={`favoriteCard ${
                currentTheme === "dark" ? "darkModeFavorites" : ""
              }`}
              key={c.cityKey}
            >
              <span className="removeFav">
                <HighlightOffIcon
                  onClick={() => removeFavorite(c.cityKey)}
                  style={{ color: "#1976d2" }}
                />
              </span>
              <span>{c.cityName}</span>
              <span>
                {currentDegreeUnit === "fahrenheit"
                  ? `${Math.round(c.details?.Temperature.Imperial.Value)}F°`
                  : `${Math.round(
                      ((c.details?.Temperature.Imperial.Value - 32) * 5) / 9
                    )}C°`}
              </span>
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
