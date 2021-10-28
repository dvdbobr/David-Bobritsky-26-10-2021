import { SWITCH_THEME } from "../constants/themeConstants";

export const changeTheme = (theme) => (dispatch) => {
  theme = theme === "light" ? "dark" : "light";
  dispatch({ type: SWITCH_THEME, payload: theme });
};
