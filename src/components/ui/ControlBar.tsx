import { useTwitter } from '../../hooks';
import { IUser } from '../../types';

type Props = {
  user: IUser;
};

export const ControlBar = ({ user }: Props): JSX.Element => {
  const { ownerId, setShowModalForm } = useTwitter();

  return (
    <div className="flex h-[50px] w-full items-center bg-white">
      <div className="controls flex w-[65%] translate-x-[calc(100vw/3)] gap-1 overflow-x-auto">
        <div className="tweets-counter__wrapper flex min-w-[100px] max-w-[100px] flex-col items-center border-b-2 border-sky-500">
          <span className="font-medium text-black text-opacity-50">Tweets</span>
          <span className="tweets-counter font-semibold text-sky-500">{user.tweets.length}</span>
        </div>
        {ownerId === user.id && (
          <button
            className="tweets-btn__add w-full min-w-[100px] max-w-[100px] border-b-2 border-transparent text-center font-medium text-black text-opacity-50 active:border-sky-500"
            onClick={() => setShowModalForm('newTweet')}
          >
            Add new Tweet
          </button>
        )}
        {ownerId === user.id && (
          <button
            className="tweets-btn__change-avatar min-w-[100px] max-w-[100px] border-b-2 border-transparent text-center font-medium text-black text-opacity-50 active:border-sky-500"
            onClick={() => setShowModalForm('avatar')}
          >
            Change Avatar
          </button>
        )}
        {ownerId === user.id && (
          <button
            className="tweets-btn__change-cover min-w-[100px] max-w-[100px] border-b-2 border-transparent text-center font-medium text-black text-opacity-50 active:border-sky-500"
            onClick={() => setShowModalForm('cover')}
          >
            Change Cover
          </button>
        )}
      </div>
    </div>
  );
};
