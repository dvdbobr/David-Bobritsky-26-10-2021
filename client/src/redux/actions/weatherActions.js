import axios from "axios";
import * as weatherActions from "../constants/weatherContsants";

export const getAutoCompleteData = (searchTerm) => async (dispatch) => {
  dispatch({
    type: weatherActions.AUTOCOMPLETE_DATA_REQUEST,
  });
  try {
    const data = await axios.get(`/api/autoComplete?q=${searchTerm}`);
    dispatch({
      type: weatherActions.AUTOCOMPLETE_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: weatherActions.AUTOCOMPLETE_DATA_FAILURE,
      payload: err,
    });
  }
};

export const getCurrentWeather = (cityKey, cityName) => async (dispatch) => {
  dispatch({
    type: weatherActions.CURRENT_WEATHER_REQUEST,
  });

  try {
    // if (localStorage.getItem("currentWeather")) {
    //   console.log("in storage");
    //   dispatch({
    //     type: weatherActions.CURRENT_WEATHER_SUCCESS,
    //     payload: {
    //       details: JSON.parse(localStorage.getItem("currentWeather")),
    //       cityName: cityName,
    //       cityKey: cityKey,
    //     },
    //   });
    // } else {
      console.log("not in storage");
      const data = await axios.get(`/api/currentWeather/${cityKey}`);

      dispatch({
        type: weatherActions.CURRENT_WEATHER_SUCCESS,
        payload: {
          details: data.data[0],
          cityName: cityName,
          cityKey: cityKey,
        },
      });
      localStorage.setItem("currentWeather", JSON.stringify(data.data[0]));
    // }
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
  // console.log("im in forecast action");
  try {
    // if (localStorage.getItem("forecast")) {
    //   console.log("in storage");
    //   dispatch({
    //     type: weatherActions.FORECAST_SUCCESS,
    //     payload: JSON.parse(localStorage.getItem("forecast")),
    //   });
    // } else {
      console.log("not in storage");
      const data = await axios.get(`/api/forecast/${cityKey}`);
      dispatch({
        type: weatherActions.FORECAST_SUCCESS,
        payload: data.data,
      });
      localStorage.setItem("forecast", JSON.stringify(data.data));
    // }
  } catch (err) {
    dispatch({
      type: weatherActions.FORECAST_FAILURE,
      payload: err,
    });
  }
};
