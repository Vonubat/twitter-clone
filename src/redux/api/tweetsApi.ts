import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { ITweet, IUser } from '../../types';

export const tweetsApi = createApi({
  reducerPath: 'tweetsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/tweets`,
  }),
  // tagTypes: ['Tweets'],
  endpoints: (builder) => ({
    getListOfUserTweets: builder.query<ITweet[], IUser['userId']>({
      query: (userId) => {
        return {
          url: userId,
        };
      },
    }),
  }),
});

export const { useGetListOfUserTweetsQuery } = tweetsApi;
