import { toast } from 'react-toastify';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

import { ValidationMsg } from '../../constants';
import { findErrorInResponse } from '../../utils';
import { setModalForm, setModalTweet } from '../slices/modalSlice';
import { setFollowers, setFollowings, setOwner } from '../slices/userSlice';
import type { RootState } from '../store';

export const macroErrorHandler: Middleware<Record<string, never>, RootState> = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const isIncludeUnauthorizedError = findErrorInResponse(action.payload, ValidationMsg.unauthorized);
    const { owner } = api.getState().userStore;

    if (isIncludeUnauthorizedError && owner) {
      toast.error(ValidationMsg.sessionHasExpired);
      api.dispatch(setOwner(null));
      api.dispatch(setFollowings([]));
      api.dispatch(setFollowers([]));
      api.dispatch(setModalForm(null));
      api.dispatch(setModalTweet(null));
    }
  }

  return next(action);
};
