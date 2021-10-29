import * as weatherActions from "../constants/weatherContsants";

const currentWeatherInitialState = {
  cityName: "",
  currentWeather: [],
  loading: false,
  error: false,
};
const forecastInitialState = {
  forecast: [],
  loading: false,
  error: false,
};

export const currentWeatherReducer = (
  state = currentWeatherInitialState,
  action
) => {
  switch (action.type) {
    case weatherActions.CURRENT_WEATHER_REQUEST:
      return { ...state, loading: true };
    case weatherActions.CURRENT_WEATHER_SUCCESS:
      return { loading: false, currentWeather: action.payload };
    case weatherActions.CURRENT_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const forecastReducer = (state = forecastInitialState, action) => {
  switch (action.type) {
    case weatherActions.FORECAST_REQUEST:
      return { ...state, loading: true };
    case weatherActions.FORECAST_SUCCESS:
      return { loading: false, forecast: action.payload };
    case weatherActions.FORECAST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
