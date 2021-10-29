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
  const currentTheme = useSelector((state) => state.theme.theme);
  const [closeSearches, setCloseSearches] = useState(false);
  const dispatch = useDispatch();

  const search = async () => {
    setCloseSearches(false);
    try {
      const response = await axios.get(`/api/autoComplete?q=${searchValue}`);
      setCitiesResult(response.data);
    } catch (err) {
      console.log(err);
    }
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
    setCloseSearches(true);
    setCitiesResult([]);
    setSearchValue("");
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const delayDebounce = setTimeout(() => {
        search();
      }, 1000);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchValue, closeSearches]);
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
      {searchValue && citiesResult.length > 0 ? (
        <div
          className={`searchData ${closeSearches ? "closeSearches" : ""} ${
            currentTheme === "dark" ? "darkSearches" : ""
          }`}
        >
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
