import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { IUser } from '../../types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
  }),
  // tagTypes: ['Users'],
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
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery } = usersApi;
