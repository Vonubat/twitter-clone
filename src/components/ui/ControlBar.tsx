import { useTwitter } from '../../hooks';
import { IUser } from '../../types';

type Props = {
  user: IUser;
};

export const ControlBar = ({ user }: Props): JSX.Element => {
  const { ownerId, setShowGetUrlModal } = useTwitter();

  return (
    <div className="w-full h-[50px] bg-white flex items-center">
      <div className="controls flex translate-x-[calc(100vw/3)] gap-1 overflow-x-auto w-[65%]">
        <div className="tweets-counter__wrapper flex flex-col items-center border-b-2 border-sky-500 min-w-[100px] max-w-[100px]">
          <span className="text-black font-medium text-opacity-50">Tweets</span>
          <span className="tweets-counter font-semibold text-sky-500">{user.tweets.length}</span>
        </div>
        {ownerId === user.id && (
          <button className="tweets-btn__add text-black font-medium text-opacity-50 text-center border-b-2 border-transparent active:border-sky-500 w-full min-w-[100px] max-w-[100px]">
            Add new Tweet
          </button>
        )}
        {ownerId === user.id && (
          <button
            className="tweets-btn__change-avatar text-black font-medium text-opacity-50 text-center border-b-2 border-transparent active:border-sky-500 min-w-[100px] max-w-[100px]"
            onClick={() => setShowGetUrlModal('avatar')}
          >
            Change Avatar
          </button>
        )}
        {ownerId === user.id && (
          <button
            className="tweets-btn__change-cover text-black font-medium text-opacity-50 text-center border-b-2 border-transparent active:border-sky-500 min-w-[100px] max-w-[100px]"
            onClick={() => setShowGetUrlModal('cover')}
          >
            Change Cover
          </button>
        )}
      </div>
    </div>
  );
};
