import React from "react";
import "./navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <span>My WeatherApp</span>
      </div>
      <div className="navbarRight">
        <ToggleButtonGroup>
          <Link to="/">
            <ToggleButton
              color="primary"
              value="home"
              selected={location.pathname === "/"}
              className="navbar-buttons"
            >
              <span>home</span>
            </ToggleButton>
          </Link>
          <Link to="/favorites">
            <ToggleButton
              color="primary"
              value="favorites"
              selected={location.pathname === "/favorites"}
              className="navbar-buttons"
            >
              <span>favorites</span>
            </ToggleButton>
          </Link>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
