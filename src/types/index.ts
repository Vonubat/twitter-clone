import { Dispatch, SetStateAction } from 'react';

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

export interface ICurrentTweetInfo {
  currentUser: IUser;
  currentTweetIndex: number;
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
  editTweet: IEditTweet;
  showModalForm: ModalForm;
  setShowModalForm: Dispatch<SetStateAction<ModalForm>>;
  showModalTweet: ModalTweet;
  setShowModalTweet: Dispatch<SetStateAction<ModalTweet>>;
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
  (data: ICurrentTweetInfo): void;
}

export interface IAddTweet {
  (data: InputEditor): void;
}

export interface IEditTweet {
  (data: InputEditor & { tweetId: ITweet['tweetId'] }): void;
}

export type ModalForm =
  | 'login'
  | 'signup'
  | 'avatar'
  | 'cover'
  | 'newTweet'
  | { modalFormType: 'editTweet'; text: string; tweetId: ITweet['tweetId'] }
  | null;

export type ModalTweet = ICurrentTweetInfo | null;

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
