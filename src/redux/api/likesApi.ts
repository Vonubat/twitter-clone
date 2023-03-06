import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { ILike, ITweet } from '../../types';

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/likes`,
    credentials: 'include',
  }),
  tagTypes: ['Like'],
  endpoints: (builder) => ({
    getLikesAndUsersOnCertainTweet: builder.query<ILike[], ITweet['tweetId']>({
      query: (tweetId) => {
        return {
          url: tweetId,
        };
      },
    }),
  }),
});

export const { useGetLikesAndUsersOnCertainTweetQuery } = likesApi;
