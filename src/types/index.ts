import { LogInMsg, SignUpMsg } from '../constants';

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
}

export interface ILogIn {
  (username: string, password: string): LogInMsg;
}

export interface ILogOut {
  (): void;
}

export interface ISignUp {
  (firstName: string, lastName: string, username: string, location: string, _password: string): SignUpMsg;
}
