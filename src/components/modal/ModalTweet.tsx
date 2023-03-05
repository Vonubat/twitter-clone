import Modal from 'react-overlays/cjs/Modal';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import defaultAvatar from '../../assets/default_avatar.png';
import closeBtn from '../../assets/icons/close.png';
import {
  modalSelector,
  setModalForm,
  setModalTweet,
  useAppDispatch,
  useAppSelector,
  useGetLikesAndUsersOnCertainTweetQuery,
  userSelector,
} from '../../redux';
import { getTimeForTweetModal } from '../../utils';
import { Button } from '../ui/Button';
import { FanAvatars } from '../ui/FansAvatars';
import { Loading } from '../ui/indicators/Loading';

import { Backdrop } from './Backdrop';

export const ModalTweet = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { modalTweet } = useAppSelector(modalSelector);
  const { currentUser, owner } = useAppSelector(userSelector);
  const { avatar, firstName, lastName, username, userId } = currentUser || {};
  const { tweetId, text } = modalTweet || {};
  const { data: likes, isLoading } = useGetLikesAndUsersOnCertainTweetQuery(tweetId ?? skipToken);
  const isOwnerPage = userId === owner?.userId;

  const handleClose = (): void => {
    dispatch(setModalTweet(null));
  };

  const handleEditTweet = (): void => {
    dispatch(setModalTweet(null));
    dispatch(
      setModalForm({
        type: 'editTweet',
        tweet: modalTweet,
      }),
    );
  };

  return (
    <Modal
      className={`modal fixed top-1/2 left-1/2 z-50 flex
      max-h-[85vh] w-[80vw] max-w-[600px] -translate-y-1/2 -translate-x-1/2 flex-col rounded-md bg-white p-7 shadow-md outline-none`}
      show={!!modalTweet}
      onHide={handleClose}
      renderBackdrop={Backdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title flex gap-5">
            <img className="h-12 w-12 shrink-0 rounded-full" src={avatar || defaultAvatar} alt="Avatar" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-black">{`${firstName} ${lastName}`}</h3>
              <span className="text-black opacity-50">{`@${username}`}</span>
            </div>
          </div>
        </div>
        <div className="modal__desc mt-5 flex max-h-[250px] w-full overflow-auto">
          <span className="text-2xl text-black">{text}</span>
        </div>
        <div className="modal__date-info mt-5">
          <span className="whitespace-nowrap text-black opacity-50">{getTimeForTweetModal(modalTweet)}</span>
        </div>
        <div className="modal__like-info mt-5 flex gap-3 border-t border-b p-2">
          <div className="text-info flex gap-1">
            <span className="select-none font-semibold text-black">
              {isLoading && <Loading type="content" />}
              {likes && likes.length}
            </span>
            <span className="select-none text-black opacity-50">Likes</span>
          </div>
          <div className="avatar-container flex flex-wrap gap-3">{likes && <FanAvatars likes={likes} />}</div>
        </div>
        {isOwnerPage && (
          <Button externalStyle="mt-3 self-center" size="large" type="submit" color="solid" onClick={handleEditTweet}>
            Edit tweet
          </Button>
        )}
        <button className="button__close absolute -top-6 -right-6 h-5 w-5" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
