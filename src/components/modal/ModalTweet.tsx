import Modal from 'react-overlays/cjs/Modal';

import defaultAvatar from '../../assets/default_avatar.png';
import closeBtn from '../../assets/icons/close.png';
import { useTwitter } from '../../hooks';
import { modalSelector, setModalForm, setModalTweet, useAppDispatch, useAppSelector } from '../../redux';
import { getTimeForTweetModal } from '../../utils';
import { Button } from '../ui/Button';
import { FanAvatars } from '../ui/FansAvatars';

import { Backdrop } from './Backdrop';

export const ModalTweet = (): JSX.Element => {
  const { ownerId } = useTwitter();
  const { modalTweet } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const { currentTweetIndex = 0 } = modalTweet || {};

  const { userId = '', firstName = '', lastName = '', username = '', tweets = [] } = modalTweet?.currentUser || {};

  const handleClose = (): void => {
    dispatch(setModalTweet(null));
  };

  const handleEditTweet = (): void => {
    dispatch(setModalTweet(null));
    dispatch(
      setModalForm({
        type: 'editTweet',
        text: tweets[currentTweetIndex].text,
        tweetId: tweets[currentTweetIndex].tweetId,
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
            <img
              className="h-12 w-12 shrink-0 rounded-full"
              src={modalTweet?.currentUser.avatar || defaultAvatar}
              alt="Avatar"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-black">{`${firstName} ${lastName}`}</h3>
              <span className="text-black opacity-50">{`@${username}`}</span>
            </div>
          </div>
        </div>
        <div className="modal__desc mt-5 flex max-h-[250px] w-full overflow-auto">
          <span className="text-2xl text-black">{tweets[currentTweetIndex]?.text || ''}</span>
        </div>
        <div className="modal__date-info mt-5">
          <span className="whitespace-nowrap text-black opacity-50">
            {getTimeForTweetModal(tweets, currentTweetIndex)}
          </span>
        </div>
        <div className="modal__like-info mt-5 flex gap-3 border-t border-b p-2">
          <div className="text-info flex gap-1">
            <span className="select-none font-semibold text-black">{tweets[currentTweetIndex]?.likes.length || 0}</span>
            <span className="select-none text-black opacity-50">Likes</span>
          </div>
          <div className="avatar-container flex flex-wrap gap-3">
            <FanAvatars likes={tweets[currentTweetIndex]?.likes} />
          </div>
        </div>
        {userId === ownerId && (
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
