import React from "react";
import "./navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDegreeUnits,
  changeTheme,
} from "../../redux/actions/themeActions";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const currentDegreeUnit = useSelector((state) => state.theme.degreeUnit);
  const switchTheme = (theme) => {
    dispatch(changeTheme(theme));
  };
  const switchDegreeUnit = (unit) => {
    dispatch(changeDegreeUnits(unit));
  };
  return (
    <div className={`navbar ${currentTheme === "dark" ? "darkNavbar" : ""}`}>
      <div className="navbarLeft">
        <span>My WeatherApp</span>
      </div>
      <div className="navbarRight">
        <ToggleButtonGroup>
          <div className="degreeToggle">
            <ToggleButton
              color="info"
              value="F°"
              exclusive
              selected={currentDegreeUnit === "fahrenheit"}
              onClick={() =>switchDegreeUnit("celsius")}
            >
              <span>F°</span>
            </ToggleButton>
            <ToggleButton
              color="info"
              value="C°"
              exclusive
              selected={currentDegreeUnit === "celsius"}
              onClick={() =>switchDegreeUnit("fahrenheit")}
            >
              <span>C°</span>
            </ToggleButton>
          </div>
          <Link to="/">
            <ToggleButton
              color="info"
              value="home"
              exclusive
              selected={location.pathname === "/"}
            >
              <span>home</span>
            </ToggleButton>
          </Link>
          <Link to="/favorites">
            <ToggleButton
              color="info"
              value="favorites"
              exclusive
              selected={location.pathname === "/favorites"}
            >
              <span>favorites</span>
            </ToggleButton>
          </Link>
          <span className="theme">
            {currentTheme === "dark" ? (
              <LightModeIcon
                style={{ fontSize: 42, color: "yellow" }}
                onClick={() => switchTheme(currentTheme)}
              />
            ) : (
              <DarkModeIcon
                style={{ fontSize: 42, color: "black" }}
                onClick={() => switchTheme(currentTheme)}
              />
            )}
          </span>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
