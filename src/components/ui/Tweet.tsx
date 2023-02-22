import defaultAvatar from '../../assets/default_avatar.png';
import likeIcon from '../../assets/icons/like.svg';
import { IUser } from '../../types';

type Props = {
  user: IUser;
  index: number;
};

export const Tweet = ({ user, index }: Props): JSX.Element => {
  return (
    <div className="tweet bg-white flex gap-5 p-3 ">
      <img className="w-12 h-12 rounded-full" src={user.avatar || defaultAvatar} alt="Avatar" />
      <article className="tweet-content flex flex-col">
        <div className="tweet-content__info flex items-center gap-2">
          <h3 className="text-black text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
          <span className="text-black opacity-50">{`@${user.username}`}</span>
          <span className="text-black opacity-50">{`${user.tweets[index].date.getDate()} ${user.tweets[
            index
          ].date.toLocaleString('en-US', {
            month: 'short',
          })} `}</span>
        </div>
        <span className="tweet-content__content mt-1">{user.tweets[index].text}</span>
        <div className="tweet-content__likes flex items-center gap-2 mt-3">
          <img src={likeIcon} alt="like icon" />
          <span className="text-black opacity-50">{user.tweets[index].likes.length}</span>
        </div>
      </article>
    </div>
  );
};
