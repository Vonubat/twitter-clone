import { IUser } from '../../types';

type Props = {
  user: IUser;
};

export const ControlBar = ({ user }: Props): JSX.Element => {
  return (
    <div className="w-full h-12 bg-white flex items-center">
      <div className="tweet-controls flex">
        <div className="tweets-counter__wrapper flex flex-col items-center border-b-2 border-sky-500 translate-x-[calc(100vw/3)] w-[100px]">
          <span className="text-black font-medium opacity-50">Tweets</span>
          <span className="font-semibold text-sky-500">{user.tweets.length}</span>
        </div>
      </div>
    </div>
  );
};
