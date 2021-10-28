import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  autoCompleteDataReducer,
  currentWeatherReducer,
  forecastReducer,
} from "./reducers/weatherReducers";
import { favoritesReducer } from "./reducers/favoritesReducers";
import { themeReducer } from "./reducers/themeReducers";


const initialState = {
  currentWeather: {
    currentWeather: localStorage.getItem("currentWeather")
      ? JSON.parse(localStorage.getItem("currentWeather"))
      : null,
  },
  favorites: {
    favorites: localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [],
  },
};
const reducer = combineReducers({
  autoCompleteData: autoCompleteDataReducer,
  currentWeather: currentWeatherReducer,
  forecast: forecastReducer,
  favorites: favoritesReducer,
  theme: themeReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
