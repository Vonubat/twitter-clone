import defaultAvatar from '../../assets/default_avatar.png';
import { setModalTweet, useAppDispatch } from '../../redux';
import { ITweet, IUser } from '../../types';
import { getTimeForTweet } from '../../utils';

import { LikeBtn } from './LikeBtn';

type Props = {
  tweet: ITweet;
  user: IUser;
};

export const Tweet = ({ tweet, user }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleTweetClick = (): void => {
    dispatch(setModalTweet({ ...tweet, user }));
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div role="button" tabIndex={0} className="tweet flex gap-5 bg-white p-3 outline-none" onClick={handleTweetClick}>
      <img className="h-12 w-12 shrink-0 rounded-full object-cover" src={user?.avatar || defaultAvatar} alt="Avatar" />
      <article className="tweet-content flex flex-col">
        <div className="tweet-content__info flex items-center gap-2">
          <h3 className="text-lg font-semibold text-black">{`${user?.firstName} ${user?.lastName}`}</h3>
          <span className=" text-black opacity-50 ">{`@${user?.username}`}</span>
          <span className="whitespace-nowrap text-black opacity-50">{getTimeForTweet(tweet)}</span>
        </div>
        <span className="tweet-content__content mt-1 break-all">{tweet.text}</span>
        <LikeBtn creatorOfTweet={user} tweet={tweet} />
      </article>
    </div>
  );
};
