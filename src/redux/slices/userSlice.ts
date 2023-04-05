import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {IBanned, IFollower, IFollowing, IUser} from '../../types';

type UserState = {
  currentUser: IUser | null;
  owner: IBanned | null;
  followings: IFollowing[];
  followers: IFollower[];
};

const initialState: UserState = {
  currentUser: null,
  owner: null,
  followings: [],
  followers: [],
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
    setFollowings: (state, action: PayloadAction<IFollowing[]>) => {
      state.followings = action.payload;
    },
    setFollowers: (state, action: PayloadAction<IFollower[]>) => {
      state.followers = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setCurrentUser, setOwner, setFollowings, setFollowers } = userSlice.actions;

export const userSelector = (state: { userStore: UserState }) => state.userStore;
