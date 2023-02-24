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
  showAuthModal: ModalAuthType;
  setShowAuthModal: Dispatch<React.SetStateAction<ModalAuthType>>;
  showGetUrlModal: ModalGetUrlType;
  setShowGetUrlModal: Dispatch<React.SetStateAction<ModalGetUrlType>>;
  showEditorModal: ModalEditorType;
  setShowEditorModal: Dispatch<React.SetStateAction<ModalEditorType>>;
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

export type ModalAuthType = 'login' | 'signup' | null;

export type ModalGetUrlType = 'avatar' | 'cover' | null;

export type ModalEditorType = 'new' | 'edit' | null;

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
