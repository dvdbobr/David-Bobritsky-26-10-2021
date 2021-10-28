import React, { useEffect } from "react";
import MainContainer from "../../components/mainContainer/MainContainer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import { useDispatch } from "react-redux";



export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {

  }, [])
  return (
    <div className="home">
      <Navbar />
      <SearchBar />
      <MainContainer />
    </div>
  );
}
