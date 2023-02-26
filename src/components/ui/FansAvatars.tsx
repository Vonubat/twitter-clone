import defaultAvatar from '../../assets/default_avatar.png';
import { useTwitter } from '../../hooks';
import { ILike, IUser } from '../../types';

type Props = {
  likes: ILike[];
};

export const FanAvatars = ({ likes = [] }: Props): JSX.Element => {
  const { users } = useTwitter();

  const fans: IUser[] = users.filter((user) => likes.some((like) => like.userId === user.id));

  return (
    <>
      {fans.map((fan) => (
        <img
          key={fan.id}
          className="h-5 w-5 shrink-0 rounded-full object-cover"
          src={fan.avatar || defaultAvatar}
          alt="Avatar"
        />
      ))}
    </>
  );
};
