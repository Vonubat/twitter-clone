import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { usersApi } from './api/usersApi';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    modalStore: modalReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  // temporary suppressing "A non-serializable value was detected in the state" error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['modal/setModalTweet'],
        // Ignore these paths in the state
        ignoredPaths: ['modalStore.modalTweet'],
      },
    }).concat([usersApi.middleware]),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
