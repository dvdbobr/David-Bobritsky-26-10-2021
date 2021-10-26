import * as weatherActions from "../constants/weatherContsants";
const initialState = {
  autoCompleteData: [],
  loading: false,
  error: false,
};
const currentWeatherInitialState = {
  cityName:'',
  currentWeather: [],
  loading: false,
  error: false,
};

export const autoCompleteDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case weatherActions.AUTOCOMPLETE_DATA_REQUEST:
      return { ...state, loading: true };
    case weatherActions.AUTOCOMPLETE_DATA_SUCCESS:
      return { loading: false, autoCompleteData: action.payload };
    case weatherActions.AUTOCOMPLETE_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
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
