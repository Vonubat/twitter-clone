import { MouseEvent } from 'react';

import { ReactComponent as Like } from '../../assets/icons/like.svg';
import {
  setModalForm,
  useAppDispatch,
  useAppSelector,
  useGetLikesAndUsersOnCertainTweetQuery,
  userSelector,
} from '../../redux';
import { ITweet } from '../../types';

import { Loading } from './indicators/Loading';

type Props = {
  tweet: ITweet;
};

export const LikeBtn = ({ tweet }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { tweetId } = tweet;
  const { data: likes, isLoading } = useGetLikesAndUsersOnCertainTweetQuery(tweetId);
  const { owner } = useAppSelector(userSelector);

  const handleAnonymousClickToLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(setModalForm({ type: 'signup' }));
  };

  const handleSignedClickToLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // likeTweet({ currentUser, currentTweetIndex });
  };

  const checkIsOwnerLikePresent = (): boolean => {
    if (!owner) {
      return false;
    }

    // const ownerLike: ILike | undefined = currentUser.likes.find((like) => userId === ownerId);

    // if (!ownerLike) {
    //   return false;
    // }

    return true;
  };

  return (
    <button
      className="tweet-content__likes mt-2 flex w-10 items-center gap-2 rounded-md p-1 hover:bg-sky-50"
      onClick={owner ? handleSignedClickToLike : handleAnonymousClickToLike}
    >
      <Like className={`${checkIsOwnerLikePresent() ? 'fill-red-700' : 'fill-none'}`} />
      <span className="select-none text-black opacity-50">
        {isLoading && <Loading type="content" />}
        {likes && likes.length}
      </span>
    </button>
  );
};
