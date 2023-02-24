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
  changeImg: IChangeImg;
  showAuthModal: ModalAuthType;
  setShowAuthModal: Dispatch<React.SetStateAction<ModalAuthType>>;
  showGetUrlModal: ModalGetUrlType;
  setShowGetUrlModal: Dispatch<React.SetStateAction<ModalGetUrlType>>;
  likeTweet: (currentUser: IUser, currentTweetIndex: number) => void;
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

export interface IChangeImg {
  (data: InputGetUrl): void;
}

export type ModalAuthType = 'login' | 'signup' | null;

export type ModalGetUrlType = 'avatar' | 'cover' | null;

type InputAuth = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
};

type InputGetUrl = {
  url: string;
};

export type CustomFormInputs = InputAuth & InputGetUrl;

export type InputName = keyof CustomFormInputs;
