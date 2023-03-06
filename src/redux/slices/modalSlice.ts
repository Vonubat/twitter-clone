import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalForm, ModalTweet } from '../../types';

type ModalState = {
  modalForm: ModalForm;
  modalTweet: ModalTweet;
};

const initialState: ModalState = {
  modalForm: null,
  modalTweet: null,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setModalForm: (state, { payload }: PayloadAction<ModalForm>) => {
      state.modalForm = payload;
    },
    setModalTweet: (state, { payload }: PayloadAction<ModalTweet>) => {
      state.modalTweet = payload;
    },
  },
});

export default modalSlice.reducer;

export const { setModalForm, setModalTweet } = modalSlice.actions;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
