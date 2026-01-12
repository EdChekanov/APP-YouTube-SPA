import { createSlice } from '@reduxjs/toolkit';
import { getVideos } from '../api/youtubeApi';

const initialState = {
  data: {
    value: null,
    query: '',
    lastQuery: '',
  },
  status: {
    isLoading: false,
    error: null,
    view: 'list',
  },
  favorites: [],
  modal: {
    isVisible: false,
    isEdit: false,
    editItem: { query: '', title: '', maxResults: '12', sort: 'relevance' },
    query: '',
  },
};

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    resetValue(state) {
      state.data.value = null;
      state.data.query = '';
    },
    setQuery(state, action) {
      state.data.query = action.payload;
    },
    setView(state, action) {
      state.status.view = action.payload;
    },
    openModal(state) {
      state.modal.isVisible = true;
    },
    closeModal(state) {
      state.modal.isVisible = false;
    },
    setModalQuery(state, action) {
      state.modal.query = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push({
        query: action.payload.query,
        title: action.payload.name,
        maxResults: `${action.payload.count}`,
        id: action.payload.id,
        sort: action.payload.sort,
      });
    },
    editFavorite(state, action) {
      state.favorites = state.favorites.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              query: action.payload.query,
              title: action.payload.name,
              maxResults: `${action.payload.count}`,
              sort: action.payload.sort,
            }
          : item
      );
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    enterEditMode(state, action) {
      state.modal.editItem = action.payload;
      state.modal.isEdit = true;
    },
    exitEditMode(state) {
      state.modal.editItem = { query: '', title: '', maxResults: 12 };
      state.modal.isEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.fulfilled, (state, action) => {
        state.data.value = action.payload;
        state.data.lastQuery = state.data.query;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status.error = action.payload;
        }
      );
  },
  selectors: {
    selectValue: (state) => state.data.value,
    selectQuery: (state) => state.data.query,
    selectLastQuery: (state) => state.data.lastQuery,
    selectLoading: (state) => state.status.isLoading,
    selectError: (state) => state.status.error,
    selectView: (state) => state.status.view,
    selectFavorites: (state) => state.favorites,
    selectModalIsVisible: (state) => state.modal.isVisible,
    selectModalIsEdit: (state) => state.modal.isEdit,
    selectModalEditItem: (state) => state.modal.editItem,
    selectModalQuery: (state) => state.modal.query,
  },
});

export const {
  selectValue,
  selectQuery,
  selectLastQuery,
  selectLoading,
  selectError,
  selectView,
  selectFavorites,
  selectModalIsVisible,
  selectModalIsEdit,
  selectModalEditItem,
  selectModalQuery,
} = youtubeSlice.selectors;
export const {
  resetValue,
  setQuery,
  setView,
  openModal,
  closeModal,
  setModalQuery,
  setFavorites,
  addFavorite,
  editFavorite,
  deleteFavorite,
  enterEditMode,
  exitEditMode,
} = youtubeSlice.actions;
export default youtubeSlice.reducer;
