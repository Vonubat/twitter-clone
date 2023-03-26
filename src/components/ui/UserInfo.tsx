import {useEffect, useRef, useState} from 'react';

import calendarIcon from '../../assets/icons/calendar.png';
import locationIcon from '../../assets/icons/location.png';
import menuIcon from '../../assets/icons/menu.svg';
import {
  setModalForm,
  useAppDispatch,
  useAppSelector,
  useFollowUserMutation,
  userSelector,
  useUnfollowUserMutation,
} from '../../redux';
import {IBanned} from '../../types';
import {getTimeForUserInfo} from '../../utils';

import {Button} from './Button';
import {useBanUserMutation, useGetBannedUsersQuery, useUnBanUserMutation} from "../../redux/api/usersApi";

type Props = {
  user: IBanned;
};

export const UserInfo = ({ user }: Props): JSX.Element => {
  const { owner, followings } = useAppSelector(userSelector);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const { data: ownerBannedUsers, refetch } = useGetBannedUsersQuery();

  const [btnActionType, setBtnActionType] = useState<'Unfollow' | 'Follow'>('Follow');

  const [unBanUser] = useUnBanUserMutation();
  const [banUser] = useBanUserMutation();


  const [btnType, setBtnType] = useState<'Unban' | 'Ban'>('Ban');
  const [canShowFollow, setCanShowFollow] = useState<boolean>(true);

  const showHideBtn = (): boolean => Boolean(owner && owner.userId !== user.userId);
  const dispatch = useAppDispatch();
  const isOwnerPage = owner?.userId === user.userId;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) && menuButtonRef.current !== event.target) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleFollow = async (): Promise<void> => {
    await followUser({ targetUserId: user.userId });
  };

  const handleUnfollow = async (): Promise<void> => {
    await unfollowUser({ targetUserId: user.userId });
  };

  const handleBan = async (): Promise<void> => {
    await banUser({ targetUserId: user.userId });
    refetch()
  };

  const handleUnBan = async (): Promise<void> => {
    await unBanUser({ targetUserId: user.userId });
    refetch()
  };

  useEffect(() => {
    if (owner && followings && ownerBannedUsers) {
      const isAlreadyFollowing = followings.some((followingUser) => followingUser.userId === user.userId);
      const isAlreadyBanned = ownerBannedUsers.some(ownerBannedUser => ownerBannedUser.userId === user.userId)

      isAlreadyFollowing ? setBtnActionType('Unfollow') : setBtnActionType('Follow');
      isAlreadyBanned ? setBtnType('Unban') : setBtnType('Ban');
      isAlreadyBanned ? setCanShowFollow(false) : setCanShowFollow(true);
    }
  }, [followings, owner, user.userId, ownerBannedUsers]);

  const followBtnDisabled = user.banned?.some(user => user.userId === owner?.userId)

  return (
    <div className="user-info flex flex-col">
      <div className="user-info__menu flex w-40 justify-between">
        <div className="user-info__name">
          <h2 className="text-2xl font-bold text-black">{`${user.firstName} ${user.lastName}`}</h2>
          <span className="text-black opacity-50">{`@${user.username}`}</span>
        </div>
        {isOwnerPage && (
          <div className="user-info__menu hidden">
            <button
              ref={menuButtonRef}
              className="user-info__menu-button tweets-btn__menu  border-b-2 border-transparent text-center font-medium"
              onClick={() => setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible)}
            >
              <img src={menuIcon} alt="location icon" className="mt-2 h-4 w-4 opacity-50" />
            </button>
            {isOwnerPage && (
              <div
                ref={menuRef}
                className={`${
                  isMenuVisible ? 'block' : 'hidden'
                } tweets-btn__menu-item absolute -ml-3 w-32 rounded-md bg-white text-sm shadow-md`}
              >
                {isOwnerPage && (
                  <button
                    className="tweets-btn__add w-32 px-4 py-2 text-left text-black text-opacity-50 hover:bg-sky-500 hover:text-white"
                    onClick={() => dispatch(setModalForm({ type: 'newTweet' }))}
                  >
                    New Tweet
                  </button>
                )}
                {isOwnerPage && (
                  <button
                    className="tweets-btn__change-avatar w-32 px-4 py-2 text-left text-black text-opacity-50 hover:bg-sky-500 hover:text-white"
                    onClick={() => dispatch(setModalForm({ type: 'avatar' }))}
                  >
                    Change Avatar
                  </button>
                )}
                {isOwnerPage && (
                  <button
                    className="tweets-btn__change-cover  w-32 px-4 py-2 text-left text-black text-opacity-50 hover:bg-sky-500 hover:text-white"
                    onClick={() => dispatch(setModalForm({ type: 'cover' }))}
                  >
                    Change Cover
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-7 flex items-center gap-3">
        <img src={calendarIcon} alt="calendar icon" />
        <span className="font-medium text-black opacity-50">{getTimeForUserInfo(user)}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <img src={locationIcon} alt="location icon" />
        <span className="font-medium text-black opacity-50">{user.location}</span>
      </div>
      {showHideBtn() && canShowFollow && (
        <Button
          disabled={followBtnDisabled}
          size="small"
          type="button"
          color="solid"
          externalStyle="self-center mt-4 w-44"
          onClick={btnActionType === 'Follow' ? handleFollow : handleUnfollow}
        >
          {btnActionType}
        </Button>
      )}
      {showHideBtn() &&  (
        <Button
          size="small"
          type="button"
          color="solid"
          externalStyle="self-center mt-4 w-44"
          onClick={btnType === 'Ban' ? handleBan : handleUnBan}
        >
          {btnType}
        </Button>
      )}
    </div>
  );
};
