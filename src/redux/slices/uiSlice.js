import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'list',
  modal: {
    isVisible: false,
    isEdit: false,
    editItem: { query: '', title: '', maxResults: '12', sort: 'relevance' },
    query: '',
  },
};

const youtubeSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setView(state, action) {
      state.view = action.payload;
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
    enterEditMode(state, action) {
      state.modal.editItem = action.payload;
      state.modal.isEdit = true;
    },
    exitEditMode(state) {
      state.modal.editItem = { query: '', title: '', maxResults: 12 };
      state.modal.isEdit = false;
    },
  },
  selectors: {
    selectView: (state) => state.view,
    selectModalIsVisible: (state) => state.modal.isVisible,
    selectModalIsEdit: (state) => state.modal.isEdit,
    selectModalEditItem: (state) => state.modal.editItem,
    selectModalQuery: (state) => state.modal.query,
  },
});

export const {
  selectView,
  selectModalIsVisible,
  selectModalIsEdit,
  selectModalEditItem,
  selectModalQuery,
} = youtubeSlice.selectors;
export const {
  setView,
  openModal,
  closeModal,
  setModalQuery,
  enterEditMode,
  exitEditMode,
} = youtubeSlice.actions;
export default youtubeSlice.reducer;
