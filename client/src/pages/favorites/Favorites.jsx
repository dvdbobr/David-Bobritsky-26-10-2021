import React from "react";
import { useSelector } from "react-redux";
import FavoritesCards from "../../components/favoritesCard/FavoritesCards";
import Navbar from "../../components/navbar/Navbar";
import "./favorites.css";

export default function Favorites() {
  const currentTheme = useSelector((state) => state.theme.theme);
  return (
    <div
      className={`favoritesPage ${currentTheme === "dark" ? "darkMode" : ""}`}
    >
      <Navbar />
      <FavoritesCards />
    </div>
  );
}
