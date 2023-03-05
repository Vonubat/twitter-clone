import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { likesApi } from './api/likesApi';
import { tweetsApi } from './api/tweetsApi';
import { usersApi } from './api/usersApi';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    modalStore: modalReducer,
    userStore: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tweetsApi.reducerPath]: tweetsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      usersApi.middleware,
      tweetsApi.middleware,
      likesApi.middleware,
    ]),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
