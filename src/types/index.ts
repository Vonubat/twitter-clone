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
  likeTweet: ILikeTweet;
  addTweet: IAddTweet;
  showModalForm: ModalForm;
  setShowModalForm: Dispatch<React.SetStateAction<ModalForm>>;
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

export interface ILikeTweet {
  (currentUser: IUser, currentTweetIndex: number): void;
}

export interface IAddTweet {
  (data: InputEditor): void;
}

export type ModalForm = 'login' | 'signup' | 'avatar' | 'cover' | 'newTweet' | 'editTweet' | null;

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

type InputEditor = {
  contentTextarea: string;
};

export type CustomFormInputs = InputAuth & InputGetUrl & InputEditor;

export type InputName = keyof CustomFormInputs;
