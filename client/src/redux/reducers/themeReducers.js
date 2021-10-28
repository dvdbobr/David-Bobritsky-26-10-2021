import { SWITCH_THEME } from "../constants/themeConstants";

export const themeReducer = (state = {theme:"light"}, action) => {
    switch (action.type) {
      case SWITCH_THEME:
        return { ...state, theme: action.payload };
      default:
        return state;
    }
  };