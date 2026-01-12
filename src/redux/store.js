import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AuthReducer from './slices/authSlice';
import youtubeReducer from './slices/youtubeSlice';
import { favoritesMiddleware } from './middleware/favoritesMiddleware';

const store = configureStore({
  reducer: combineReducers({ auth: AuthReducer, youtube: youtubeReducer }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(favoritesMiddleware.middleware),
});

export default store;
