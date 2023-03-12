import { MouseEvent } from 'react';

import { ReactComponent as Like } from '../../assets/icons/like.svg';
import {
  setModalForm,
  useAddRemoveLikeMutation,
  useAppDispatch,
  useAppSelector,
  useGetLikesAndUsersOnCertainTweetQuery,
  userSelector,
} from '../../redux';
import { ILike, ITweet } from '../../types';

import { Loading } from './indicators/Loading';

type Props = {
  tweet: ITweet;
};

export const LikeBtn = ({ tweet }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector(userSelector);
  const { tweetId } = tweet;
  const { data: likes, isLoading } = useGetLikesAndUsersOnCertainTweetQuery(tweetId);
  const [addRemoveLike] = useAddRemoveLikeMutation();

  const handleAnonymousClickToLike = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(setModalForm({ type: 'signup' }));
  };

  const handleSignedClickToLike = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    await addRemoveLike({ tweetId });
  };

  const checkIsOwnerLikePresent = (): boolean => {
    if (!owner) {
      return false;
    }

    if (likes) {
      const ownerLike: ILike | undefined = likes.find(({ user }) => {
        if (user) {
          return user.userId === owner.userId;
        }

        return false;
      });

      if (!ownerLike) {
        return false;
      }
    }

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
