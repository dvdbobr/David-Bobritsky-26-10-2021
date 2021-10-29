import React, { useEffect, useState } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCurrentWeather } from "../../redux/actions/weatherActions";

export default function Home() {
  const dispatch = useDispatch();
  const geoLocationFromStorage = useState(JSON.parse(localStorage.getItem("geoLocation")));
  const [geoLocation, setGeoLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const currentTheme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(`${position.coords.latitude} ${position.coords.longitude}`);
      });
    } else {
      console.log("No Location Found");
    }
  }, []);
  useEffect(() => {
    const getCurrentLocation = async () => {
      console.log(geoLocation);
      try {
        if (geoLocation&&!geoLocationFromStorage) {
          localStorage.setItem("geoLocation", JSON.stringify(geoLocation));
          const res = await axios({
            method: "GET",
            url: "/api/geoLocation/",
            params: {
              q: `${geoLocation.latitude},${geoLocation.longitude}`,
            },
          });
          dispatch(getCurrentWeather(res.data.Key, res.data.EnglishName));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCurrentLocation();
  }, [geoLocation]);
  return (
    <div className={`home ${currentTheme === "dark" ? "darkMode" : ""}`}>
      <Navbar />
      <SearchBar />
      <MainContainer />
    </div>
  );
}
