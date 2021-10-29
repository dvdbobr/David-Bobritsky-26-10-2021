import { SWITCH_DEGREE_UNIT, SWITCH_THEME } from "../constants/themeConstants";

export const changeTheme = (theme) => (dispatch) => {
  theme = theme === "light" ? "dark" : "light";
  dispatch({ type: SWITCH_THEME, payload: theme });
};
export const changeDegreeUnits = (unit) => (dispatch) => {
  unit = unit === "fahrenheit" ? "celsius" : "fahrenheit";
  dispatch({ type: SWITCH_DEGREE_UNIT, payload: unit });
};
