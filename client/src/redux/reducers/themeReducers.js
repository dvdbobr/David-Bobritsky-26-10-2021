import { SWITCH_DEGREE_UNIT, SWITCH_THEME } from "../constants/themeConstants";

export const themeReducer = (state = {theme:"light",degreeUnit:"fahrenheit"}, action) => {
    switch (action.type) {
      case SWITCH_THEME:
        return { ...state, theme: action.payload };
      case SWITCH_DEGREE_UNIT:
        return { ...state, degreeUnit: action.payload };
      default:
        return state;
    }
  };