import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addFavorite,
  deleteFavorite,
  editFavorite,
  setFavorites,
} from '../slices/youtubeSlice';

export const favoritesMiddleware = createListenerMiddleware();

favoritesMiddleware.startListening({
  type: 'youtube/initFavorites',
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
    const currentFavorites = listenerApi.getState().youtube.favorites;

    localStorage.setItem(
      `favorites_${token}`,
      JSON.stringify(currentFavorites)
    );
  },
});
