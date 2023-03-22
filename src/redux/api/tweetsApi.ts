import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { InputEditor, ITweet, IUser } from '../../types';

export const tweetsApi = createApi({
  reducerPath: 'tweetsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/tweets`,
    credentials: 'include',
    mode: 'cors',
  }),
  tagTypes: ['Tweet'],
  endpoints: (builder) => ({
    getListOfUserTweets: builder.query<ITweet[], IUser['userId']>({
      query: (userId) => {
        return {
          url: userId,
        };
      },
      transformResponse: (response: ITweet[]) =>
        response.sort(({ date: dateA }, { date: dateB }) => {
          return new Date(Date.parse(dateB)).getTime() - new Date(Date.parse(dateA)).getTime();
        }),
      providesTags: (result) =>
        result ? [...result.map(({ tweetId }) => ({ type: 'Tweet' as const, tweetId })), 'Tweet'] : ['Tweet'],
    }),
    createNewTweet: builder.mutation<IUser, InputEditor>({
      query: (data) => {
        return {
          url: '',
          method: 'POST',
          body: { text: data.contentTextarea },
        };
      },
      invalidatesTags: ['Tweet'],
    }),
    updateTweet: builder.mutation<IUser, { tweetId: ITweet['tweetId'] } & InputEditor>({
      query: (data) => {
        return {
          url: data.tweetId,
          method: 'PUT',
          body: { text: data.contentTextarea },
        };
      },
      invalidatesTags: ['Tweet'],
    }),
    deleteTweet: builder.mutation<IUser, ITweet['tweetId']>({
      query: (tweetId) => {
        return {
          url: tweetId,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Tweet'],
    }),
  }),
});

export const {
  useGetListOfUserTweetsQuery,
  useCreateNewTweetMutation,
  useUpdateTweetMutation,
  useDeleteTweetMutation,
  useLazyGetListOfUserTweetsQuery,
} = tweetsApi;
