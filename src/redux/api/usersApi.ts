import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { FollowUnfollowDto, IFollower, IFollowing, InputGetUrl, IUser } from '../../types';
import { setCurrentUser, setFollowers, setFollowings } from '../slices/userSlice';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    credentials: 'include',
    mode: 'cors',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
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
        const { data } = await queryFulfilled;

        dispatch(setCurrentUser(data));
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
    getAllFollowings: builder.query<IFollowing[], void>({
      query: () => '/follow/followings',

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data: allFollowings } = await queryFulfilled;

        dispatch(setFollowings(allFollowings));
      },
    }),
    getAllFollowers: builder.query<IFollower[], void>({
      query: () => '/follow/followers',
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data: allFollowers } = await queryFulfilled;

        dispatch(setFollowers(allFollowers));
      },
    }),
    followUser: builder.mutation<IFollowing[], FollowUnfollowDto>({
      query: (data) => {
        return {
          url: '/follow',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data: allFollowings } = await queryFulfilled;

        dispatch(setFollowings(allFollowings));
        dispatch(
          usersApi.util.updateQueryData('getAllFollowings', undefined, () => {
            return allFollowings;
          }),
        );
      },
    }),
    unfollowUser: builder.mutation<IFollowing[], FollowUnfollowDto>({
      query: (data) => {
        return {
          url: '/unfollow',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data: allFollowings } = await queryFulfilled;

        dispatch(setFollowings(allFollowings));
        dispatch(
          usersApi.util.updateQueryData('getAllFollowings', undefined, () => {
            return allFollowings;
          }),
        );
      },
    }),
    getFeedList: builder.query<IFollowing[], IUser | null>({
      query: () => '/feed/list',
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useChangeAvatarMutation,
  useChangeBgImageMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetAllFollowersQuery,
  useGetAllFollowingsQuery,
  useGetFeedListQuery,
} = usersApi;
