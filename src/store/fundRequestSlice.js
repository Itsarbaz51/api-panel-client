import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRequest: null,
  viewOpen: false,
  modalOpen: false,
  rejectOpen: false,
};

const fundRequestSlice = createSlice({
  name: "fundRequest",

  initialState,

  reducers: {
    setSelectedRequest(state, action) {
      state.selectedRequest = action.payload;
    },

    openView(state) {
      state.viewOpen = true;
    },

    closeView(state) {
      state.viewOpen = false;
      state.selectedRequest = null;
    },

    openModal(state) {
      state.modalOpen = true;
    },

    closeModal(state) {
      state.modalOpen = false;
      state.selectedRequest = null;
    },

    openReject(state) {
      state.rejectOpen = true;
    },

    closeReject(state) {
      state.rejectOpen = false;
    },
  },
});

export const {
  setSelectedRequest,
  openView,
  closeView,
  openModal,
  closeModal,
  openReject,
  closeReject,
} = fundRequestSlice.actions;

export default fundRequestSlice.reducer;
