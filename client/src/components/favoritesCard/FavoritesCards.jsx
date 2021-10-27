import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../../redux/actions/weatherActions";
import "./favoritesCards.css";
export default function FavoritesCards() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    // dispatch(getForecast("215854"));
  }, [favorites]);
  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        favorites?.map((c) => {
          return (
            <div className="favoriteCard" key={c.cityKey}>
              <span>{c.cityName}</span>
            </div>
          );
        })
      ) : (
        <h1>No Favorites Added Yet</h1>
      )}
    </div>
  );
}
