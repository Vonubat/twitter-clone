import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types';

type UserState = {
  currentUser: IUser | null;
  owner: IUser | null;
};

const initialState: UserState = {
  currentUser: null,
  owner: null,
};

const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    setOwner: (state, action: PayloadAction<IUser | null>) => {
      state.owner = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setCurrentUser, setOwner } = userSlice.actions;

export const userSelector = (state: { userStore: UserState }) => state.userStore;
