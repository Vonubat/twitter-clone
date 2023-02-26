import defaultAvatar from '../../assets/default_avatar.png';
import { useTwitter } from '../../hooks';
import { IUser } from '../../types';
import { getTimeForTweet } from '../../utils';

import { LikeBtn } from './LikeBtn';

type Props = {
  user: IUser;
  currentTweetIndex: number;
};

export const Tweet = ({ user, currentTweetIndex }: Props): JSX.Element => {
  const { setShowModalTweet } = useTwitter();

  const handleTweetClick = () => {
    setShowModalTweet({ currentUser: user, currentTweetIndex });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div role="button" tabIndex={0} className="tweet flex gap-5 bg-white p-3 outline-none" onClick={handleTweetClick}>
      <img className="h-12 w-12 shrink-0 rounded-full object-cover" src={user.avatar || defaultAvatar} alt="Avatar" />
      <article className="tweet-content flex flex-col">
        <div className="tweet-content__info flex items-center gap-2">
          <h3 className="text-lg font-semibold text-black">{`${user.firstName} ${user.lastName}`}</h3>
          <span className="text-black opacity-50">{`@${user.username}`}</span>
          <span className="whitespace-nowrap text-black opacity-50">{getTimeForTweet(user, currentTweetIndex)}</span>
        </div>
        <span className="tweet-content__content mt-1">{user.tweets[currentTweetIndex].text}</span>
        <LikeBtn currentUser={user} currentTweetIndex={currentTweetIndex} />
      </article>
    </div>
  );
};
