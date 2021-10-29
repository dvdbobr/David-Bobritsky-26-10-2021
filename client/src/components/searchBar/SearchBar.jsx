import React, { useEffect, useState } from "react";
import "./searchBar.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentWeather,
  getForecast,
} from "../../redux/actions/weatherActions";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
  const [citiesResult, setCitiesResult] = useState("");
  const currentWeatherData = useSelector((state) => state.currentWeather);
  const currentTheme = useSelector((state) => state.theme.theme);
  const { loading, error, currentWeather } = currentWeatherData;
  const [closeSearches,setCloseSearches] = useState(false);
  const dispatch = useDispatch();

  const search = async () => {
    // if (localStorage.getItem("currentCity")) {
    //   setCitiesResult(JSON.parse(localStorage.getItem("currentCity")));
    // }
    // else {
      setCloseSearches(false);
    try {
      const response = await axios.get(`/api/autoComplete?q=${searchValue}`);
      setCitiesResult(response.data);
      console.log(response.data[0]);
      console.log(citiesResult);
    } catch (err) {
      console.log(err);
    }
    // }
  };
  const checkEnglish = (e) => {
    if (/[^A-Za-z ]/gi.test(e.target.value)) {
      setIsEnglish(false);
    } else {
      setIsEnglish(true);
      let value = e.target.value;
      value = value.replace(/[^A-Za-z ]/gi, "");
      setSearchValue(value);
    }
  };
  const searchAfterClickOnCity = async (cityKey, cityName) => {
    dispatch(getCurrentWeather(cityKey, cityName));
    dispatch(getForecast(cityKey));
    setSearchValue(cityName);
    setCloseSearches(true)
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const delayDebounce = setTimeout(() => {
        // search();
      }, 3000);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchValue]);
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={
          isEnglish ? "Search for a city" : "Please Use English Only"
        }
        value={isEnglish ? searchValue : ""}
        onChange={(e) => {
          checkEnglish(e);
        }}
      />
      <div className="searchIcon">
        <IconButton color="primary" onClick={search}>
          <SearchIcon />
        </IconButton>
      </div>
      {searchValue && citiesResult.length > 0 ? (
        <div className={`searchData ${closeSearches?'closeSearches':''} ${currentTheme === "dark" ? "darkSearches" : ""}`}>
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
    </div>
  );
}
