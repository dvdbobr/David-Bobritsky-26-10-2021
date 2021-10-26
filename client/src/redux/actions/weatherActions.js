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

  console.log("im in currentWeather action");
  try {
    // if (localStorage.getItem("currentWeather")) {
    //   console.log("in storage");
    //   dispatch({
    //     type: weatherActions.CURRENT_WEATHER_SUCCESS,
    //     payload: JSON.parse(localStorage.getItem("currentWeather")),
    //   });
    // }
    // else {
    console.log("not in storage");
    const data = await axios.get(`/api/currentWeather/${cityKey}`);
    console.log(
      `data in currentWeather action ${JSON.stringify(data.data[0])}`
    );
    cityName = cityName ? cityName : "Tel Aviv";
    dispatch({
      type: weatherActions.CURRENT_WEATHER_SUCCESS,
      payload: { details: data.data[0], cityName: cityName },
    });
    localStorage.setItem("currentCity", JSON.stringify(data.data[0]));
    localStorage.setItem("currentWeather", JSON.stringify(data.data[0]));
    // }
  } catch (err) {
    dispatch({
      type: weatherActions.CURRENT_WEATHER_FAILURE,
      payload: err,
    });
  }
};
