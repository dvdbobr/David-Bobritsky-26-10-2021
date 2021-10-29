import React, { useEffect } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        localStorage.setItem(
          "geoLocation",
          JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
        console.log(`${position.coords.latitude} ${position.coords.longitude}`);
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
