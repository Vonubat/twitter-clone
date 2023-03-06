import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { InputGetUrl, IUser } from '../../types';
import { setCurrentUser } from '../slices/userSlice';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<Omit<IUser, 'tweets' | 'likes'>[], void>({
      query: () => '',
      providesTags: (result) =>
        result ? [...result.map(({ userId }) => ({ type: 'User' as const, userId })), 'User'] : ['User'],
    }),
    getUser: builder.query<IUser, IUser['username']>({
      query: (username) => {
        return {
          url: username,
        };
      },
      providesTags: (result) => [
        {
          type: 'User',
          id: result?.userId,
        },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),
    changeAvatar: builder.mutation<IUser, InputGetUrl>({
      query: (data) => {
        return {
          url: '/avatar',
          method: 'PUT',
          body: { avatar: data.url },
        };
      },
      invalidatesTags: ['User'],
    }),
    changeBgImage: builder.mutation<IUser, InputGetUrl>({
      query: (data) => {
        return {
          url: '/bgImage',
          method: 'PUT',
          body: { bgImage: data.url },
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useChangeAvatarMutation, useChangeBgImageMutation } = usersApi;
