import { useEffect, useState } from 'react';

import calendarIcon from '../../assets/icons/calendar.png';
import locationIcon from '../../assets/icons/location.png';
import { useAppSelector, useFollowUserMutation, userSelector, useUnfollowUserMutation } from '../../redux';
import { IUser } from '../../types';
import { getTimeForUserInfo } from '../../utils';

import { Button } from './Button';

type Props = {
  user: IUser;
};

export const UserInfo = ({ user }: Props): JSX.Element => {
  const { owner, followings } = useAppSelector(userSelector);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [btnActionType, setBtnActionType] = useState<'Unfollow' | 'Follow'>('Follow');

  const showHideBtn = (): boolean => Boolean(owner && owner.userId !== user.userId);

  const handleFollow = async (): Promise<void> => {
    await followUser({ targetUserId: user.userId });
  };

  const handleUnfollow = async (): Promise<void> => {
    await unfollowUser({ targetUserId: user.userId });
  };

  useEffect(() => {
    if (owner && followings) {
      const isAllreadyFollowing = followings.some((followingUser) => followingUser.userId === user.userId);

      isAllreadyFollowing ? setBtnActionType('Unfollow') : setBtnActionType('Follow');
    }
  }, [followings, owner, user.userId]);

  return (
    <div className="user-info flex flex-col">
      <h2 className="text-2xl font-bold text-black">{`${user.firstName} ${user.lastName}`}</h2>
      <span className="text-black opacity-50">{`@${user.username}`}</span>
      <div className="mt-7 flex items-center gap-3">
        <img src={calendarIcon} alt="calendar icon" />
        <span className="font-medium text-black opacity-50">{getTimeForUserInfo(user)}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <img src={locationIcon} alt="location icon" />
        <span className="font-medium text-black opacity-50">{user.location}</span>
      </div>
      {showHideBtn() && (
        <Button
          size="small"
          type="button"
          color="solid"
          externalStyle="self-center mt-4 w-44"
          onClick={btnActionType === 'Follow' ? handleFollow : handleUnfollow}
        >
          {btnActionType}
        </Button>
      )}
    </div>
  );
};
