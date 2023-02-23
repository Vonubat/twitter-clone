import calendarIcon from '../../assets/icons/calendar.png';
import locationIcon from '../../assets/icons/location.png';
import { IUser } from '../../types';

type Props = {
  user: IUser;
};

export const UserInfo = ({ user }: Props): JSX.Element => {
  return (
    <div className="user-info flex flex-col">
      <h2 className="text-black text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
      <span className="text-black opacity-50">{`@${user.username}`}</span>

      <div className="flex items-center gap-3 mt-7">
        <img src={calendarIcon} alt="calendar icon" />
        <span className="text-black font-medium opacity-50">{`Since ${user.joined.toLocaleString('en-US', {
          month: 'long',
        })} ${user.joined.getFullYear()}`}</span>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <img src={locationIcon} alt="location icon" />
        <span className="text-black font-medium opacity-50">{user.location}</span>
      </div>
    </div>
  );
};