import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  autoCompleteDataReducer,
  currentWeatherReducer,
} from "./reducers/weatherReducers";


const initialState = {
  currentWeather: {
    currentWeather: localStorage.getItem("currentWeather")
      ? JSON.parse(localStorage.getItem("currentWeather"))
      : null,
  },
};
const reducer = combineReducers({
  autoCompleteData: autoCompleteDataReducer,
  currentWeather: currentWeatherReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
