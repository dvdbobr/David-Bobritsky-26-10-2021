import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../constants/favoritesConstants";

export const addToFavorites = (weatherDetails) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: weatherDetails,
  });
  localStorage.setItem(
    "favorites",
    JSON.stringify(getState().favorites.favorites)
  );
};
export const removeFromFavorites = (cityKey) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_FAVORITES, payload: cityKey });
  localStorage.setItem(
    "favorites",
    JSON.stringify(getState().favorites.favorites)
  );
};
