import React, { useEffect, useState } from "react";
import "./searchBar.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather, getForecast } from "../../redux/actions/weatherActions";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [citiesResult, setCitiesResult] = useState("");
  const currentWeatherData = useSelector((state) => state.currentWeather);
  const { loading, error, currentWeather } = currentWeatherData;
  const dispatch = useDispatch();

  const search = async () => {
    // if (localStorage.getItem("currentCity")) {
    //   setCitiesResult(JSON.parse(localStorage.getItem("currentCity")));
    // } 
    // else {
      try {
        if (/^[A-Za-z ]*$/.test(searchValue)) {
          console.log("in search function");
          const response = await axios.get(
            `/api/autoComplete?q=${searchValue}`
          );
          setCitiesResult(response.data);
          console.log(response.data[0]);
          console.log(citiesResult);
        }
      } catch (err) {
        console.log(err);
      }
    // }
  };
  const searchAfterClickOnCity = async (cityKey, cityName) => {
    console.log("in search2 function");
    dispatch(getCurrentWeather(cityKey,cityName));
    dispatch(getForecast(cityKey));
    setSearchValue(cityName);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const delayDebounce = setTimeout(() => {
        console.log(searchValue);
      }, 3000);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchValue]);
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search for a city"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <div className="searchIcon">
        <IconButton color="primary" onClick={search}>
          <SearchIcon />
        </IconButton>
      </div>
      {searchValue && citiesResult.length > 0 ? (
        <div className="searchData">
          {citiesResult.map((c) => {
            return (
              <div
                key={c.Key}
                onClick={() => {
                  searchAfterClickOnCity(c.Key, c.LocalizedName);
                }}
              >
                {c.LocalizedName}, {c.AdministrativeArea.LocalizedName},{" "}
                {c.Country.LocalizedName}
              </div>
            );
          })}
        </div>
      ) : null}
      {/* <button onClick={() => getCurrentWeather(result[0]["Key"])}>
    getWeather
  </button> */}
    </div>
  );
}
