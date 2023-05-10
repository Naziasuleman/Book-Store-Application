import { combineReducers } from "redux";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SHOW_FAVOURITES,
  HIDE_FAVOURITES,
} from "./actions";

const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteBooks: [...state.favoriteBooks, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteBooks: state.favoriteBooks.filter(
          (book) => book.id !== action.payload
        ),
      };
    case SHOW_FAVOURITES:
      return {
        ...state,
        showFavoritesBool: true,
      };

    case HIDE_FAVOURITES:
      return {
        ...state,
        showFavoritesBool: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
