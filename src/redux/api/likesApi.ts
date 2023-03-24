import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../constants';
import { ILike, ITweet, IUser } from '../../types';
import type { RootState } from '../store';

import { tweetsApi } from './tweetsApi';
import { usersApi } from './usersApi';

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
    addRemoveLike: builder.mutation<ILike[], { tweetId: ITweet['tweetId']; userId: IUser['userId'] }>({
      query: (data) => {
        return {
          url: '',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Like'],
      async onQueryStarted({ userId, tweetId }, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: likes } = await queryFulfilled;
          const state = getState() as RootState;
          const { owner } = state.userStore;

          dispatch(
            tweetsApi.util.updateQueryData('getListOfUserTweets', userId, (draft) => {
              const tweets = draft.map((tweet) => {
                if (tweet.tweetId === tweetId) {
                  const updatedTweet = { ...tweet };

                  updatedTweet.likes = likes;

                  return updatedTweet;
                }

                return tweet;
              });

              return tweets;
            }),
          );
          dispatch(
            usersApi.util.updateQueryData('getFeedList', owner, (draft) => {
              const followings = draft.map((followingUser) => {
                if (followingUser.userId === userId) {
                  const updatedFollowingUser = { ...followingUser };
                  const { tweets } = updatedFollowingUser;

                  updatedFollowingUser.tweets = tweets.map((tweet) => {
                    if (tweet.tweetId === tweetId) {
                      const updatedTweet = { ...tweet };

                      updatedTweet.likes = likes;

                      return updatedTweet;
                    }

                    return tweet;
                  });

                  return updatedFollowingUser;
                }

                return followingUser;
              });

              return followings;
            }),
          );
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const { useGetLikesAndUsersOnCertainTweetQuery, useAddRemoveLikeMutation } = likesApi;
