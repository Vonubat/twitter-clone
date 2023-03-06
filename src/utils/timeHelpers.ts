import { ITweet, IUser, ModalTweet } from '../types';

export const getTimeForUserInfo = (user: IUser) => {
  const { joined } = user;
  const dt = new Date(Date.parse(joined));

  return `Since ${dt.toLocaleString('en-US', {
    month: 'long',
  })} ${dt.getFullYear()}`;
};

export const getTimeForTweet = (tweet: ITweet) => {
  const { date } = tweet || {};
  const dt = new Date(Date.parse(date));

  return `${dt.getDate()} ${dt.toLocaleString('en-US', {
    month: 'short',
  })} `;
};

export const getTimeForTweetModal = (tweet: ModalTweet) => {
  const { date = '2000-01-01 00:00:00.000000-03' } = tweet || {};
  const dt = new Date(Date.parse(date));

  return `${dt.getHours() || '00'}:${dt.getMinutes() || '00'} - ${dt.getDate() || '1'} ${
    dt.toLocaleString('en-US', {
      month: 'short',
    }) || 'Jan'
  }. ${dt.getFullYear() || '2000'}`;
};
