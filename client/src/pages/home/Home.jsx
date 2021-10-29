import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainContainer from "../../components/mainContainer/MainContainer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";

export default function Home() {
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if ("geoLocation" in navigator) {
      navigator.geoLocation.getCurrentPosition(function (position) {
        localStorage.setItem(
          "geoLocation",
          JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
    } else {
      console.log("Location Not Found");
    }
  }, []);
  return (
    <div className={`home ${currentTheme === "dark" ? "darkMode" : ""}`}>
      <Navbar />
      <SearchBar />
      <MainContainer />
    </div>
  );
}
