import { MouseEvent, useEffect, useState } from 'react';

import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { setModalForm, useAddRemoveLikeMutation, useAppDispatch, useAppSelector, userSelector } from '../../redux';
import { ITweet, IUser } from '../../types';

type Props = {
  tweet: ITweet;
  creatorOfTweet: IUser;
};

export const LikeBtn = ({ tweet, creatorOfTweet }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector(userSelector);
  const { tweetId, likes } = tweet;
  const { userId } = creatorOfTweet;
  const [addRemoveLike] = useAddRemoveLikeMutation();
  const [ownerLike, setOwnerLike] = useState<'fill-red-700' | 'fill-none'>('fill-none');

  const handleAnonymousClickToLike = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(setModalForm({ type: 'signup' }));
  };

  const handleSignedClickToLike = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    await addRemoveLike({ tweetId, userId });
  };

  useEffect(() => {
    if (owner && likes) {
      const isOwnerLikePresent = likes.some(({ user }) => {
        return user?.userId === owner.userId;
      });

      isOwnerLikePresent ? setOwnerLike('fill-red-700') : setOwnerLike('fill-none');
    }
  }, [likes, owner]);

  return (
    <button
      className="tweet-content__likes mt-2 flex w-10 items-center gap-2 rounded-md p-1 hover:bg-sky-50"
      onClick={owner ? handleSignedClickToLike : handleAnonymousClickToLike}
    >
      <Like className={ownerLike} />
      <span className="select-none text-black opacity-50">{likes && likes.length}</span>
    </button>
  );
};
