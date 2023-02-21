import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid';

import { AUTH_KEY, DB_KEY, LogInMsg, SignUpMsg } from '../constants';
import dbJSON from '../db/db.json';
import { ILogIn, ILogOut, ISignUp, ITwitterContext, IUser } from '../types';
import { reviver } from '../utils';

import { useStateWithLocalStorage } from './useStateWithLocalStorage';

const TwitterContext: React.Context<ITwitterContext | null> = createContext<ITwitterContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TwitterContextProvider: ({ children }: Props) => JSX.Element = ({ children }: Props): JSX.Element => {
  const dbLS: string | null = localStorage.getItem(DB_KEY);
  const [users, setUsers] = useStateWithLocalStorage<IUser[]>(DB_KEY, dbLS ? JSON.parse(dbLS, reviver) : dbJSON);
  const ownerIdLS: string | null = localStorage.getItem(AUTH_KEY);
  const [ownerId, setOwnerId] = useStateWithLocalStorage<string | null>(
    AUTH_KEY,
    ownerIdLS ? JSON.parse(ownerIdLS) : null,
  );

  const logIn: ILogIn = useCallback(
    (username, password) => {
      // before connecting the real database username === password
      const owner: IUser | undefined = users.find(({ username: ref }) => username === ref && password === ref);

      if (!owner) {
        return LogInMsg.cantFindUser;
      }

      setOwnerId(owner.id);

      return LogInMsg.success;
    },
    [setOwnerId, users],
  );

  const logOut: ILogOut = useCallback(() => {
    setOwnerId(null);
  }, [setOwnerId]);

  const signUp: ISignUp = useCallback(
    (firstName, lastName, username, location, _password) => {
      // password is not saved
      const isEmptyField = !(
        firstName.trim() &&
        lastName.trim() &&
        username.trim() &&
        location.trim() &&
        _password.trim()
      );

      if (isEmptyField) {
        return SignUpMsg.emptyField;
      }

      const isExistUserWithEqualUsername: IUser | undefined = users.find(({ username: ref }) => username === ref);

      if (isExistUserWithEqualUsername) {
        return SignUpMsg.userIsExist;
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

      return SignUpMsg.success;
    },
    [setOwnerId, setUsers, users],
  );

  const providerValue: ITwitterContext = useMemo(
    () => ({
      users,
      ownerId,
      logIn,
      logOut,
      signUp,
    }),
    [users, ownerId, logIn, logOut, signUp],
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
