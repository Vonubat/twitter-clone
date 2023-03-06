import { ValidationMsg } from '../constants';

export interface IUser {
  userId: string;
  avatar: string | null;
  bgImage: string | null;
  username: string;
  firstName: string;
  lastName: string;
  location: string;
  joined: string;
  tweets: ITweet[];
  likes: ILike[];
}

export interface ILike {
  likeId: string;
  user?: IUser;
  tweet?: ITweet;
}

export interface ITweet {
  tweetId: string;
  text: string;
  date: string;
  user?: IUser;
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
  (data: ITweet): void;
}

export interface IAddTweet {
  (data: InputEditor): void;
}

export interface IEditTweet {
  (data: InputEditor & { tweetId: ITweet['tweetId'] }): void;
}

export type ModalForm =
  | { type: 'login' | 'signup' | 'avatar' | 'cover' | 'newTweet' }
  | { type: 'editTweet'; tweet: ModalTweet }
  | null;

export type ModalTweet = ITweet | null;

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

export interface IGenericResponse {
  status: string;
  message: string;
}
