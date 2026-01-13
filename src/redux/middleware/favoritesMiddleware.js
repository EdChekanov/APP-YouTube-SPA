import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addFavorite,
  deleteFavorite,
  editFavorite,
  setFavorites,
} from '../slices/favoritesSlice';

export const favoritesMiddleware = createListenerMiddleware();

favoritesMiddleware.startListening({
  type: 'favorites/initFavorites',
  effect: (_, listenerApi) => {
    const token = localStorage.getItem('token');
    const saved = JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];
    listenerApi.dispatch(setFavorites(saved));
  },
});

favoritesMiddleware.startListening({
  matcher: isAnyOf(addFavorite, editFavorite, deleteFavorite),
  effect: (_, listenerApi) => {
    const token = localStorage.getItem('token');
    const currentFavorites = listenerApi.getState().favorites.value;

    localStorage.setItem(
      `favorites_${token}`,
      JSON.stringify(currentFavorites)
    );
  },
});
