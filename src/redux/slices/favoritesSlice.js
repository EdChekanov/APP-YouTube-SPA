import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const youtubeSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.value = action.payload;
    },
    addFavorite(state, action) {
      state.value.push({
        query: action.payload.query,
        title: action.payload.name,
        maxResults: `${action.payload.count}`,
        id: action.payload.id,
        sort: action.payload.sort,
      });
    },
    editFavorite(state, action) {
      const favoriteItem = state.value.find(
        (item) => item.id === action.payload.id
      );

      favoriteItem.query = action.payload.query;
      favoriteItem.title = action.payload.name;
      favoriteItem.maxResults = `${action.payload.count}`;
      favoriteItem.sort = action.payload.sort;
    },
    deleteFavorite: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
  selectors: {
    selectFavorites: (state) => state.value,
  },
});

export const { selectFavorites } = youtubeSlice.selectors;
export const { setFavorites, addFavorite, editFavorite, deleteFavorite } =
  youtubeSlice.actions;
export default youtubeSlice.reducer;
