import { createStore } from 'redux';

const initialState = {
  favorites: [],
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id),
      };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
