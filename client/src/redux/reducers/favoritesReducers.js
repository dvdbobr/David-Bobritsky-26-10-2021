import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../constants/favoritesConstants";

export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return { ...state, favorites: state.favorites.filter(c => c.cityKey !== action.payload) };
    default:
      return state;
  }
};

