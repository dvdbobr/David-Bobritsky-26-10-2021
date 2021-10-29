import React, { useEffect } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const currentTheme = useSelector((state) => state.theme.theme);
  return (
    <div className={`home ${currentTheme === "dark" ? "darkMode" : ""}`}>
      <Navbar />
      <SearchBar />
      <MainContainer />
    </div>
  );
}
