import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice';
import youtubeReducer from './slices/youtubeSlice';

const store = configureStore({
  reducer: combineReducers({ auth: AuthReducer, youtube: youtubeReducer }),
});

export default store;
