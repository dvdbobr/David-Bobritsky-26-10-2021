import React, { useEffect } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import { useDispatch } from "react-redux";
import { getCurrentWeather } from "../../redux/actions/weatherActions";



export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather("215854", "Tel Aviv"));

  }, [])
  return (
    <div className="home">
      <Navbar />
      <SearchBar />
      <MainContainer />
    </div>
  );
}
