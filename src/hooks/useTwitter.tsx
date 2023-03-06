import { Context, createContext, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { AUTH_KEY, DB_KEY, ValidationMsg } from '../constants';
import dbJSON from '../db/db.json';
import { modalSelector, useAppSelector } from '../redux';
import {
  IAddTweet,
  IChangeImg,
  IEditTweet,
  ILikeTweet,
  ILogIn,
  ILogOut,
  ISignUp,
  ITwitterContext,
  IUser,
} from '../types';
import { reviver } from '../utils';

import { useStateWithLocalStorage } from './useStateWithLocalStorage';

const TwitterContext: Context<ITwitterContext | null> = createContext<ITwitterContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TwitterContextProvider: ({ children }: Props) => JSX.Element = ({ children }: Props): JSX.Element => {
  const { modalForm } = useAppSelector(modalSelector);
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

  const logIn: ILogIn = useCallback(
    ({ username, password }) => {
      // before connecting the real database username === password
      const owner: IUser | undefined = users.find(({ username: ref }) => username === ref && password === ref);

      if (!owner) {
        return ValidationMsg.cantFindUser;
      }

      setOwnerId(owner.userId);
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
        userId: nanoid(),
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

  const changeImg: IChangeImg = useCallback(
    ({ url }) => {
      const key = modalForm?.type === 'cover' ? 'bgImage' : 'avatar';
      const updatedUsers = users.map((user) => {
        if (user.id === ownerId) {
          const updatedUser = { ...user };

          updatedUser[key] = url;

          return updatedUser;
        }

        return user;
      });

      setUsers(updatedUsers);
    },
    [ownerId, setUsers, modalForm, users],
  );

  const likeTweet: ILikeTweet = useCallback(
    ({ currentUser, currentTweetIndex }) => {
      const updatedUsers = users.map((user) => {
        if (user.username === currentUser.username) {
          const { tweets } = user;

          const ownerLikeIndex = tweets[currentTweetIndex].likes.findIndex(({ userId }) => userId === ownerId);

          const updatedLikes =
            ownerLikeIndex === -1
              ? tweets[currentTweetIndex].likes.concat({ userId: ownerId as string })
              : tweets[currentTweetIndex].likes.filter(({ userId }) => userId !== ownerId);

          const updatedTweets = tweets.map((tweet, index) => {
            if (index === currentTweetIndex) {
              const updatedTweet = { ...tweet };

              updatedTweet.likes = updatedLikes;

              return updatedTweet;
            }

            return tweet;
          });

          return { ...user, tweets: updatedTweets };
        }

        return user;
      });

      setUsers(updatedUsers);
    },
    [ownerId, setUsers, users],
  );

  const addTweet: IAddTweet = useCallback(
    ({ contentTextarea }) => {
      const updatedUsers = users.map((user) => {
        if (user.id === ownerId) {
          const { tweets } = user;
          const newTweet = {
            tweetId: nanoid(),
            text: contentTextarea,
            likes: [],
            date: new Date(),
          };

          tweets.reverse();
          tweets.push(newTweet);
          tweets.reverse();

          return user;
        }

        return user;
      });

      setUsers(updatedUsers);
    },
    [ownerId, setUsers, users],
  );

  const editTweet: IEditTweet = useCallback(
    ({ contentTextarea, tweetId }) => {
      const updatedUsers = users.map((user) => {
        if (user.id === ownerId) {
          const { tweets } = user;

          const updatedTweets = tweets.map((tweet) => {
            if (tweet.tweetId === tweetId) {
              const editedTweet = { ...tweet };

              editedTweet.text = contentTextarea;

              return editedTweet;
            }

            return tweet;
          });

          return { ...user, tweets: updatedTweets };
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
      changeImg,
      likeTweet,
      addTweet,
      editTweet,
    }),
    [users, ownerId, logIn, logOut, signUp, changeImg, likeTweet, addTweet, editTweet],
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
