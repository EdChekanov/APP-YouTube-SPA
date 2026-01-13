import { combineReducers, configureStore } from '@reduxjs/toolkit';

import AuthReducer from './slices/authSlice';
import youtubeDataReducer from './slices/youtubeDataSlice';
import favoritesReducer from './slices/favoritesSlice';
import uiReducer from './slices/uiSlice';
import { favoritesMiddleware } from './middleware/favoritesMiddleware';

const store = configureStore({
  reducer: combineReducers({
    auth: AuthReducer,
    youtubeData: youtubeDataReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(favoritesMiddleware.middleware),
});

export default store;
