import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/axios';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const { data } = await authApi.post('/users/register', userData);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const { data } = await authApi.post('/auth/login', userData);
      return thunkAPI.fulfillWithValue(data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
