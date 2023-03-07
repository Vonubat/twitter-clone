import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { InputAuth, IUser } from '../../types';
import { setCurrentUser, setOwner } from '../slices/userSlice';

import { usersApi } from './usersApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: 'include',
    mode: 'cors',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, InputAuth>({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data: newUser } = await queryFulfilled;

        dispatch(setCurrentUser(newUser));
        dispatch(setOwner(newUser));
        dispatch(
          usersApi.util.updateQueryData('getAllUsers', undefined, (draft) => {
            draft.push(newUser);
          }),
        );
      },
    }),
    loginUser: builder.mutation<IUser, InputAuth>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setCurrentUser(data));
        dispatch(setOwner(data));
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
          method: 'POST',
        };
      },
      async onQueryStarted(_args, { dispatch }) {
        try {
          dispatch(setOwner(null));
        } catch {
          dispatch(setOwner(null));
        }
      },
    }),
    verifyUser: builder.query<IUser, null>({
      query() {
        return {
          url: '',
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setOwner(data));
        } catch {
          dispatch(setOwner(null));
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation, useVerifyUserQuery } = authApi;
