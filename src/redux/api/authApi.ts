import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { InputAuth, IUser } from '../../types';
import { setCurrentUser, setOwner } from '../slices/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: 'include',
  }),
  tagTypes: ['Users'],
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
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data));
          dispatch(setOwner(data));
        } catch (e) {
          console.error(e);
        }
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
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data));
          dispatch(setOwner(data));
        } catch (e) {
          console.error(e);
        }
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
        } catch (e) {
          dispatch(setOwner(null));
          console.error(e);
        }
      },
    }),
    verifyUser: builder.query<IUser, void>({
      query() {
        return {
          url: '',
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setOwner(data));
        } catch (e) {
          dispatch(setOwner(null));
          console.error(e);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation, useVerifyUserQuery } = authApi;
