import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  currentWeatherReducer,
  forecastReducer,
} from "./reducers/weatherReducers";
import { favoritesReducer } from "./reducers/favoritesReducers";
import { themeReducer } from "./reducers/themeReducers";


const initialState = {
  favorites: {
    favorites: localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [],
  },
};
const reducer = combineReducers({
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
