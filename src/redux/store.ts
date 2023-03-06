import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { likesApi } from './api/likesApi';
import { tweetsApi } from './api/tweetsApi';
import { usersApi } from './api/usersApi';
import { macroErrorHandler } from './middlewares/macroErrorHandler';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  modalStore: modalReducer,
  userStore: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [tweetsApi.reducerPath]: tweetsApi.reducer,
  [likesApi.reducerPath]: likesApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      usersApi.middleware,
      tweetsApi.middleware,
      likesApi.middleware,
      macroErrorHandler,
    ]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
