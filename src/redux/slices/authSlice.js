import { createSlice } from '@reduxjs/toolkit';
import { register, login } from '../api/authApi';

const initialState = {
  value: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetValue(state) {
      state.value = null;
    },
    logout() {
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload);
        state.value = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
  selectors: {
    selectValue: (state) => state.value,
    selectLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const { selectValue, selectLoading, selectError } = authSlice.selectors;
export const { resetValue, logout } = authSlice.actions;
export default authSlice.reducer;
