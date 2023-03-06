import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { IUser } from '../../types';
import { setCurrentUser } from '../slices/userSlice';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<Omit<IUser, 'tweets' | 'likes'>[], void>({
      query: () => '',
    }),
    getUser: builder.query<IUser, IUser['username']>({
      query: (username) => {
        return {
          url: username,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery } = usersApi;
