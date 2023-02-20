export interface Like {
  userId: number;
}

export interface Tweet {
  tweetId: number;
  text: string;
  likes: Like[];
  date: string;
}

export interface User {
  id: number;
  avatar: string;
  bgImage: string;
  username: string;
  firstName: string;
  lastName: string;
  location: string;
  joined: string;
  tweets: Tweet[];
}
