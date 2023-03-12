import { toast } from 'react-toastify';
import { isFulfilled, Middleware } from '@reduxjs/toolkit';

import { SystemMsg, UserEvents } from '../../constants';
import type { RootState } from '../store';

export const macroUserEventsHandler: Middleware<Record<string, never>, RootState> = (_api) => (next) => (action) => {
  if (isFulfilled(action)) {
    const userEvent: UserEvents = action.meta.arg.endpointName;

    if (userEvent === UserEvents.registerUser) {
      toast.success(SystemMsg.registerUser);
    }

    if (userEvent === UserEvents.loginUser) {
      toast.success(SystemMsg.loginUser);
    }

    if (userEvent === UserEvents.logoutUser) {
      toast.success(SystemMsg.logoutUser);
    }
  }

  return next(action);
};
