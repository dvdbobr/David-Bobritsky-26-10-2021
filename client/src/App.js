import React from "react";
import "./App.css";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/favorites" component={Favorites} />
    </BrowserRouter>
  );
}

export default App;
