import React from "react";
import "./navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/actions/themeActions";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const switchTheme = (theme) => {
    dispatch(changeTheme(theme));
  };
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
          <span className="theme">
            {currentTheme === "dark" ? (
              <LightModeIcon
                style={{ fontSize: 42,color:"yellow" }}
                onClick={() => switchTheme(currentTheme)}
              />
            ) : (
              <DarkModeIcon
                style={{ fontSize: 42,color:"black" }}
                onClick={() => switchTheme(currentTheme)}
              />
            )}
          </span>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
