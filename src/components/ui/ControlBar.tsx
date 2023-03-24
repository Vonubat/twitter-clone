import { useEffect, useRef, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { setModalForm, useAppDispatch, useAppSelector, useGetListOfUserTweetsQuery, userSelector } from '../../redux';
import { IUser } from '../../types';

type Props = {
  user: IUser;
};

export const ControlBar = ({ user }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { owner, currentUser, followers } = useAppSelector(userSelector);
  const { data: tweets } = useGetListOfUserTweetsQuery(currentUser?.userId ?? skipToken);
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

  return (
    <div className="flex h-[50px] w-full items-center bg-white">
      <div className="flex w-full min-w-[650px] max-w-[650px] items-center">
        <div className="controls flex w-[65%] translate-x-[calc(100vw/3)] gap-1 overflow-x-auto">
          <div className="tweets-counter__wrapper flex min-w-[80px] max-w-[80px] flex-col items-center border-sky-500">
            <span className="font-medium text-black text-opacity-50">Tweets</span>
            <span className="tweets-counter font-semibold text-sky-500">{tweets?.length}</span>
          </div>
          {isOwnerPage && (
            <button
              className="tweets-btn__followers min-w-[80px] max-w-[80px] border-b-2 border-transparent text-center font-medium text-black text-opacity-50 active:border-sky-500"
              onClick={() => dispatch(setModalForm({ type: 'followers' }))}
            >
              <p>Followers</p>
              <p className="text-sky-500">{followers.length}</p>
            </button>
          )}
        </div>
        {isOwnerPage && (
          <div className="controls__menu relative flex translate-x-[calc(100vw/3)]">
            <button
              ref={menuButtonRef}
              className="menu-button tweets-btn__menu min-w-[60px] max-w-[60px] border-b-2 border-transparent text-center font-medium text-black text-opacity-50 active:border-sky-500"
              onClick={() => setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible)}
            >
              Menu
            </button>

            {isOwnerPage && (
              <div
                ref={menuRef}
                className={`${
                  isMenuVisible ? 'block' : 'hidden'
                } tweets-btn__menu-item absolute -mt-32 -ml-3 w-32 rounded-md bg-white text-sm shadow-md`}
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
    </div>
  );
};
