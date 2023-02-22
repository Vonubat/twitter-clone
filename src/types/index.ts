import { Dispatch } from 'react';

import { ValidationMsg } from '../constants';

export interface ILike {
  userId: string;
}

export interface ITweet {
  tweetId: string;
  text: string;
  likes: ILike[];
  date: Date;
}

export interface IUser {
  id: string;
  avatar: string | null;
  bgImage: string | null;
  username: string;
  firstName: string;
  lastName: string;
  location: string;
  joined: Date;
  tweets: ITweet[];
}

export interface ITwitterContext {
  users: IUser[];
  ownerId: string | null;
  logIn: ILogIn;
  logOut: ILogOut;
  signUp: ISignUp;
  showAuthModal: ModalAuthType;
  setShowAuthModal: Dispatch<React.SetStateAction<ModalAuthType>>;
}

export interface ILogIn {
  (data: InputAuth): ValidationMsg.cantFindUser | ValidationMsg.success;
}

export interface ILogOut {
  (): void;
}

export interface ISignUp {
  (data: InputAuth): ValidationMsg.userIsExist | ValidationMsg.success;
}

export type ModalAuthType = 'login' | 'signup' | null;

export type InputAuth = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
};
