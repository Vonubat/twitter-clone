import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { ILike, ITweet } from '../../types';

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/likes`,
    credentials: 'include',
    mode: 'cors',
  }),
  tagTypes: ['Like'],
  endpoints: (builder) => ({
    getLikesAndUsersOnCertainTweet: builder.query<ILike[], ITweet['tweetId']>({
      query: (tweetId) => {
        return {
          url: tweetId,
        };
      },
      providesTags: (result) =>
        result ? [...result.map(({ likeId }) => ({ type: 'Like' as const, likeId })), 'Like'] : ['Like'],
    }),
    addRemoveLike: builder.mutation<ILike[], { tweetId: ITweet['tweetId'] }>({
      query: (data) => {
        return {
          url: '',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Like'],
    }),
  }),
});

export const { useGetLikesAndUsersOnCertainTweetQuery, useAddRemoveLikeMutation } = likesApi;
