import defaultAvatar from '../../assets/default_avatar.png';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { useTwitter } from '../../hooks';
import { ILike, IUser } from '../../types';

type Props = {
  user: IUser;
  currentTweetIndex: number;
};

export const Tweet = ({ user, currentTweetIndex }: Props): JSX.Element => {
  const { ownerId, setShowAuthModal, likeTweet } = useTwitter();

  const handleAnonymousClick = (): void => {
    setShowAuthModal('signup');
  };

  const handleSignedClick = (): void => {
    likeTweet(user, currentTweetIndex);
  };

  const checkIsOwnerLikePresent = (): boolean => {
    if (!ownerId) {
      return false;
    }

    const ownerLike: ILike | undefined = user.tweets[currentTweetIndex].likes.find(({ userId }) => userId === ownerId);

    if (!ownerLike) {
      return false;
    }

    return true;
  };

  return (
    <div className="tweet flex gap-5 bg-white p-3 ">
      <img className="h-12 w-12 min-w-max rounded-full" src={user.avatar || defaultAvatar} alt="Avatar" />
      <article className="tweet-content flex flex-col">
        <div className="tweet-content__info flex items-center gap-2">
          <h3 className="text-lg font-semibold text-black">{`${user.firstName} ${user.lastName}`}</h3>
          <span className="text-black opacity-50">{`@${user.username}`}</span>
          <span className="text-black opacity-50">{`${user.tweets[currentTweetIndex].date.getDate()} ${user.tweets[
            currentTweetIndex
          ].date.toLocaleString('en-US', {
            month: 'short',
          })} `}</span>
        </div>
        <span className="tweet-content__content mt-1">{user.tweets[currentTweetIndex].text}</span>
        <div className="tweet-content__likes mt-3 flex items-center gap-2">
          <Like
            className={`cursor-pointer ${checkIsOwnerLikePresent() ? 'fill-red-700' : 'fill-none'}`}
            onClick={ownerId ? handleSignedClick : handleAnonymousClick}
          />
          <span className="select-none text-black opacity-50">{user.tweets[currentTweetIndex].likes.length}</span>
        </div>
      </article>
    </div>
  );
};
