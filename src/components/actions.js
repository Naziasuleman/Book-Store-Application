export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SHOW_FAVOURITES = 'SHOW_FAVOURITES';
export const HIDE_FAVOURITES = 'HIDE_FAVOURITES';

export const showFavorites = ()=> {
  return {
    type: SHOW_FAVOURITES,
  };
}

export const hideFavorites = ()=> {
  return {
    type: HIDE_FAVOURITES,
  };
}


export const addToFavorites = (book) => {
    return {
      type: ADD_TO_FAVORITES,
      payload: book,
    };
  };
  
  export const removeFromFavorites = (bookId) => {
    return {
      type: REMOVE_FROM_FAVORITES,
      payload: bookId,
    };
  };
  