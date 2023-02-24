import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { AUTH_KEY, DB_KEY, ValidationMsg } from '../constants';
import dbJSON from '../db/db.json';
import { ILogIn, ILogOut, ISignUp, ITweet, ITwitterContext, IUser, ModalAuthType } from '../types';
import { reviver } from '../utils';

import { useStateWithLocalStorage } from './useStateWithLocalStorage';

const TwitterContext: React.Context<ITwitterContext | null> = createContext<ITwitterContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TwitterContextProvider: ({ children }: Props) => JSX.Element = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dbLS: string | null = localStorage.getItem(DB_KEY);
  const [users, setUsers] = useStateWithLocalStorage<IUser[]>(
    DB_KEY,
    dbLS ? JSON.parse(dbLS, reviver) : JSON.parse(JSON.stringify(dbJSON), reviver),
  );
  const ownerIdLS: string | null = localStorage.getItem(AUTH_KEY);
  const [ownerId, setOwnerId] = useStateWithLocalStorage<string | null>(
    AUTH_KEY,
    ownerIdLS ? JSON.parse(ownerIdLS) : null,
  );
  const [showAuthModal, setShowAuthModal] = useState<ModalAuthType>(null);

  const logIn: ILogIn = useCallback(
    ({ username, password }) => {
      // before connecting the real database username === password
      const owner: IUser | undefined = users.find(({ username: ref }) => username === ref && password === ref);

      if (!owner) {
        return ValidationMsg.cantFindUser;
      }

      setOwnerId(owner.id);
      navigate(`/${owner.username}`);

      return ValidationMsg.success;
    },
    [navigate, setOwnerId, users],
  );

  const logOut: ILogOut = useCallback(() => {
    setOwnerId(null);
  }, [setOwnerId]);

  const signUp: ISignUp = useCallback(
    ({ firstName, lastName, username, location }) => {
      // password is not saved
      const isExistUserWithEqualUsername: IUser | undefined = users.find(({ username: ref }) => username === ref);

      if (isExistUserWithEqualUsername) {
        return ValidationMsg.userIsExist;
      }

      const newUser: IUser = {
        id: nanoid(),
        avatar: null,
        bgImage: null,
        username,
        firstName,
        lastName,
        location,
        joined: new Date(),
        tweets: [
          {
            tweetId: nanoid(),
            text: `Hello World! My name is ${firstName}. My first Tweet :)`,
            likes: [],
            date: new Date(),
          },
        ],
      };

      setUsers([...users, newUser]);
      setOwnerId(newUser.id);
      navigate(`/${newUser.username}`);

      return ValidationMsg.success;
    },
    [navigate, setOwnerId, setUsers, users],
  );

  const likeTweet = useCallback(
    (tweetId: string, username: string) => {
      const updatedUsers = users.map((user) => {
        if (user.username === username) {
          try {
            const { tweets } = user;
            const targetTweet = tweets.find(({ tweetId: ref }) => tweetId === ref) as ITweet;
            const tweetsWithoutTargetTweet = tweets.filter(({ tweetId: ref }) => tweetId !== ref);

            const ownerLike = targetTweet.likes.find(({ userId }) => userId === ownerId);
            const updatedLikes = ownerLike
              ? targetTweet.likes.filter(({ userId }) => userId !== ownerId)
              : [...targetTweet.likes, { userId: ownerId as string }];

            const targetTweetWithUpdatedLikes = { ...targetTweet, likes: [...updatedLikes] };

            const updatedTweets = [...tweetsWithoutTargetTweet, targetTweetWithUpdatedLikes];

            return { ...user, tweets: updatedTweets };
          } catch (e) {
            console.error(e);
            console.error("Error in the method likeTweet of useTwitter hook (wasn't found tweet with such tweetId)");
          }
        }

        return user;
      });

      setUsers(updatedUsers);
    },
    [ownerId, setUsers, users],
  );

  const providerValue: ITwitterContext = useMemo(
    () => ({
      users,
      ownerId,
      logIn,
      logOut,
      signUp,
      showAuthModal,
      setShowAuthModal,
      likeTweet,
    }),
    [users, ownerId, logIn, logOut, signUp, showAuthModal, setShowAuthModal, likeTweet],
  );

  return <TwitterContext.Provider value={providerValue}>{children}</TwitterContext.Provider>;
};

export const useTwitter: () => ITwitterContext = (): ITwitterContext => {
  // get the context
  const context: ITwitterContext | null = useContext(TwitterContext);

  // if `null`, throw an error
  if (context === null) {
    throw new Error('useTwitter was used outside of its Provider');
  }

  return context;
};
