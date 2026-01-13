import { createSlice } from '@reduxjs/toolkit';
import { getVideos } from '../api/youtubeApi';

const initialState = {
  value: null,
  query: '',
  lastQuery: '',
  isLoading: false,
  error: null,
};

const youtubeDataSlice = createSlice({
  name: 'youtubeData',
  initialState,
  reducers: {
    resetValue(state) {
      state.value = null;
      state.query = '';
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.fulfilled, (state, action) => {
        state.value = action.payload;
        state.lastQuery = state.query;
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
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
  selectors: {
    selectValue: (state) => state.value,
    selectQuery: (state) => state.query,
    selectLastQuery: (state) => state.lastQuery,
    selectLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const {
  selectValue,
  selectQuery,
  selectLastQuery,
  selectLoading,
  selectError,
} = youtubeDataSlice.selectors;
export const { resetValue, setQuery } = youtubeDataSlice.actions;
export default youtubeDataSlice.reducer;
