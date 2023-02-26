import { ITweet, IUser } from '../types';

export const getTimeForUserInfo = (user: IUser) =>
  `Since ${user.joined.toLocaleString('en-US', {
    month: 'long',
  })} ${user.joined.getFullYear()}`;

export const getTimeForTweet = (user: IUser, currentTweetIndex: number) =>
  `${user.tweets[currentTweetIndex].date.getDate()} ${user.tweets[currentTweetIndex].date.toLocaleString('en-US', {
    month: 'short',
  })} `;

export const getTimeForTweetModal = (tweets: ITweet[], currentTweetIndex: number) =>
  `${tweets[currentTweetIndex]?.date.getHours() || '00'}:${tweets[currentTweetIndex]?.date.getMinutes() || '00'} - ${
    tweets[currentTweetIndex]?.date.getDate() || '1'
  } ${
    tweets[currentTweetIndex]?.date.toLocaleString('en-US', {
      month: 'short',
    }) || 'Jan'
  }. ${tweets[currentTweetIndex]?.date.getFullYear() || '2000'}`;
