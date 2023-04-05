import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface IUser {
  userId: string;
  avatar: string | null;
  bgImage: string | null;
  username: string;
  firstName: string;
  lastName: string;
  location: string;
  joined: string;
}

export interface ILike {
  likeId: string;
  user: IUser;
  tweet?: ITweet;
}

export interface ITweet {
  tweetId: string;
  text: string;
  date: string;
  likes: ILike[];
  user?: IUser;
}

export type ModalForm =
  | { type: 'login' | 'signup' | 'avatar' | 'cover' | 'newTweet' | 'followers' | 'banned'}
  | { type: 'editTweet'; tweet: ModalTweet }
  | null;

interface IModalTweet extends ITweet {
  user: IUser;
}

export type ModalTweet = IModalTweet | null;

export type InputAuth = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
};

export type InputGetUrl = {
  url: string;
};

export type InputEditor = {
  contentTextarea: string;
};

export type CustomFormInputs = InputAuth & InputGetUrl & InputEditor;

export type InputName = keyof CustomFormInputs;

export interface IGenericResponse {
  statusCode?: string;
  message?: string | string[];
  error?: string;
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isGenericResponse(data: unknown): data is IGenericResponse {
  return typeof data === 'object' && data != null && ('message' in data || 'error' in data);
}

export interface IFollowing extends IUser {
  tweets: ITweet[];
}

export interface IFollower extends IUser {}
export interface IBanned extends IUser {
  banned?: IUser[]
}

export type FollowUnfollowDto = {
  targetUserId: string;
};
