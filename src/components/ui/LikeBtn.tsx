import { MouseEvent } from 'react';

import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { useTwitter } from '../../hooks';
import { ICurrentTweetInfo, ILike } from '../../types';

type Props = ICurrentTweetInfo;

export const LikeBtn = ({ currentUser, currentTweetIndex }: Props): JSX.Element => {
  const { setShowModalForm, likeTweet, ownerId } = useTwitter();

  const handleAnonymousClickToLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModalForm('signup');
  };

  const handleSignedClickToLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    likeTweet({ currentUser, currentTweetIndex });
  };

  const checkIsOwnerLikePresent = (): boolean => {
    if (!ownerId) {
      return false;
    }

    const ownerLike: ILike | undefined = currentUser.tweets[currentTweetIndex].likes.find(
      ({ userId }) => userId === ownerId,
    );

    if (!ownerLike) {
      return false;
    }

    return true;
  };

  return (
    <button
      className="tweet-content__likes mt-2 flex w-10 items-center gap-2 rounded-md p-1 hover:bg-sky-50"
      onClick={ownerId ? handleSignedClickToLike : handleAnonymousClickToLike}
    >
      <Like className={`${checkIsOwnerLikePresent() ? 'fill-red-700' : 'fill-none'}`} />
      <span className="select-none text-black opacity-50">{currentUser.tweets[currentTweetIndex].likes.length}</span>
    </button>
  );
};
