import defaultAvatar from '../../assets/default_avatar.png';
import { ILike } from '../../types';

type Props = {
  likes: ILike[];
};

export const FanAvatars = ({ likes }: Props): JSX.Element => {
  return (
    <>
      {likes.map((like) => (
        <img
          key={like.user?.userId}
          className="h-5 w-5 shrink-0 rounded-full object-cover"
          src={like.user?.avatar || defaultAvatar}
          alt="Avatar"
        />
      ))}
    </>
  );
};
