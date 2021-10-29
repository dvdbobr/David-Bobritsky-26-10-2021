import axios from "axios";
import * as weatherActions from "../constants/weatherContsants";

export const getCurrentWeather = (cityKey, cityName) => async (dispatch) => {
  dispatch({
    type: weatherActions.CURRENT_WEATHER_REQUEST,
  });

  try {
      const data = await axios.get(`/api/currentWeather/${cityKey}`);

      dispatch({
        type: weatherActions.CURRENT_WEATHER_SUCCESS,
        payload: {
          details: data.data[0],
          cityName: cityName,
          cityKey: cityKey,
        },
      });
  } catch (err) {
    dispatch({
      type: weatherActions.CURRENT_WEATHER_FAILURE,
      payload: err,
    });
  }
};

export const getForecast = (cityKey) => async (dispatch) => {
  dispatch({
    type: weatherActions.FORECAST_REQUEST,
  });
  try {
      const data = await axios.get(`/api/forecast/${cityKey}`);
      dispatch({
        type: weatherActions.FORECAST_SUCCESS,
        payload: data.data,
      });
  } catch (err) {
    dispatch({
      type: weatherActions.FORECAST_FAILURE,
      payload: err,
    });
  }
};
