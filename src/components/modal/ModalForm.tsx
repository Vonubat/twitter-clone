import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-overlays/cjs/Modal';
import { NavLink, useNavigate } from 'react-router-dom';

import defaultAvatar from '../../assets/default_avatar.png';
import closeBtn from '../../assets/icons/close.png';
import { ValidationMsg } from '../../constants';
import {
  modalSelector,
  setModalForm,
  useAppDispatch,
  useAppSelector,
  useChangeAvatarMutation,
  useChangeBgImageMutation,
  useCreateNewTweetMutation,
  useFollowUserMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  userSelector,
  useUnfollowUserMutation,
  useUpdateTweetMutation,
} from '../../redux';
import { CustomFormInputs } from '../../types';
import { findErrorInResponse } from '../../utils';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

import { Backdrop } from './Backdrop';

export const ModalForm = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { modalForm } = useAppSelector(modalSelector);
  const { followings, followers } = useAppSelector(userSelector);
  const { type } = modalForm || {};
  const [logIn] = useLoginUserMutation();
  const [signUp] = useRegisterUserMutation();
  const [changeAvatar] = useChangeAvatarMutation();
  const [changeBgImage] = useChangeBgImageMutation();
  const [createNewTweet] = useCreateNewTweetMutation();
  const [updateTweet] = useUpdateTweetMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const form = useForm<CustomFormInputs>();
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitSuccessful, isDirty, isValidating },
  } = form;

  const handleClose = (): void => {
    dispatch(setModalForm(null));
  };

  const handleFormSubmit = async (data: CustomFormInputs): Promise<void> => {
    if (type === 'login') {
      try {
        const owner = await logIn(data).unwrap();

        dispatch(setModalForm(null));
        navigate(owner.username);
      } catch (error) {
        const isIncludeWrongCredentialsError = findErrorInResponse(error, ValidationMsg.wrongCredentials);

        if (isIncludeWrongCredentialsError) {
          setError('username', {
            type: 'manual',
            message: ValidationMsg.wrongCredentials,
          });
          setError('password', {
            type: 'manual',
            message: ValidationMsg.wrongCredentials,
          });
        }
      }
    }

    if (type === 'signup') {
      try {
        const owner = await signUp(data).unwrap();

        dispatch(setModalForm(null));
        navigate(owner.username);
      } catch (error) {
        const isIncludeUserIsExistError = findErrorInResponse(error, ValidationMsg.userIsExist);

        if (isIncludeUserIsExistError) {
          setError('username', {
            type: 'manual',
            message: ValidationMsg.userIsExist,
          });
        }
      }
    }

    if (type === 'avatar') {
      try {
        await changeAvatar(data).unwrap();

        dispatch(setModalForm(null));
      } catch (error) {
        const isIncludeNonValidUrlError = findErrorInResponse(error, ValidationMsg.nonValidUrl);

        if (isIncludeNonValidUrlError) {
          setError('url', {
            type: 'manual',
            message: ValidationMsg.nonValidUrl,
          });
        }
      }
    }

    if (type === 'cover') {
      try {
        await changeBgImage(data).unwrap();

        dispatch(setModalForm(null));
      } catch (error) {
        const isIncludeNonValidUrlError = findErrorInResponse(error, ValidationMsg.nonValidUrl);

        if (isIncludeNonValidUrlError) {
          setError('url', {
            type: 'manual',
            message: ValidationMsg.nonValidUrl,
          });
        }
      }
    }

    if (type === 'newTweet') {
      await createNewTweet(data);

      dispatch(setModalForm(null));
    }

    if (modalForm?.type === 'editTweet') {
      const { tweet } = modalForm;
      const { contentTextarea } = data;

      if (tweet) {
        const { tweetId } = tweet;

        await updateTweet({ tweetId, contentTextarea });
      }

      dispatch(setModalForm(null));
    }
  };

  useEffect((): void => {
    if (isSubmitSuccessful) {
      reset();
    }

    if (isValidating) {
      clearErrors();
    }
  }, [clearErrors, isSubmitSuccessful, isValidating, reset]);

  useEffect(() => {
    if (modalForm?.type === 'editTweet') {
      const { tweet } = modalForm;

      if (tweet) {
        setValue('contentTextarea', tweet.text);
      }
    }

    if (type === 'newTweet') {
      setValue('contentTextarea', '');
    }
  }, [modalForm, setValue, type]);

  const handleFollow = async (userId: string): Promise<void> => {
    await followUser({ targetUserId: userId });
  };
  const handleUnfollow = async (userId: string): Promise<void> => {
    await unfollowUser({ targetUserId: userId });
  };

  return (
    <Modal
      className={`modal fixed top-1/2 left-1/2 z-50 flex ${
        type === 'signup' || type === 'login' ? 'w-[300px]' : 'w-full min-w-[300px] max-w-[700px]'
      } -translate-y-1/2 -translate-x-1/2 flex-col items-center rounded-md bg-white p-7 shadow-md outline-none`}
      show={!!modalForm}
      onHide={handleClose}
      renderBackdrop={Backdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title text-center text-lg font-semibold text-black text-opacity-50">
            {type === 'login' && 'Log In'}
            {type === 'signup' && 'Sign Up'}
            {type === 'newTweet' && 'Create new tweet'}
            {type === 'editTweet' && 'Edit your tweet'}
            {(type === 'avatar' || type === 'cover') && `Paste URL for ${type} image`}
            {type === 'followers' && 'People who follow you'}
          </div>
          {type === 'signup' && (
            <button
              className="modal__link text-sm text-black  text-opacity-50 underline-offset-4 hover:underline"
              onClick={() => dispatch(setModalForm({ type: 'login' }))}
            >
              Already signed up?
            </button>
          )}
        </div>
        <form className="modal__desc flex w-full flex-col gap-4 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
          {(type === 'signup' || type === 'login') && (
            <InputForm form={form} name="username" type="text" placeholder="Nickname" />
          )}
          {(type === 'signup' || type === 'login') && (
            <InputForm form={form} name="password" type="password" placeholder="Password" />
          )}
          {type === 'signup' && <InputForm form={form} name="firstName" type="text" placeholder="First Name" />}
          {type === 'signup' && <InputForm form={form} name="lastName" type="text" placeholder="Last Name" />}
          {type === 'signup' && <InputForm form={form} name="location" type="text" placeholder="Location" />}
          {(type === 'avatar' || type === 'cover') && (
            <InputForm form={form} name="url" type="text" placeholder="URL" />
          )}
          {(type === 'newTweet' || type === 'editTweet') && (
            <InputForm form={form} name="contentTextarea" type="text" placeholder="Write a tweet..." />
          )}
          {type === 'followers' &&
            followers.map((followerUser) => {
              const isOwnerFollowing = followings?.some(
                (followingUser) => followingUser.userId === followerUser.userId,
              );

              return (
                <div key={followerUser.userId} className="my-2 flex justify-between rounded-md hover:bg-blue-100">
                  <NavLink
                    className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-400"
                    key={followerUser.userId}
                    to={`/${followerUser.username}`}
                    onClick={() => handleClose()}
                  >
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={followerUser.avatar || defaultAvatar}
                      alt="Rounded avatar"
                    />
                    <div className="flex-grow px-2 font-medium">{`${followerUser.firstName} ${followerUser.lastName} (@${followerUser.username})`}</div>
                  </NavLink>
                  <Button
                    externalStyle="self-center"
                    size="large"
                    type="submit"
                    color="solid"
                    onClick={
                      isOwnerFollowing
                        ? () => handleUnfollow(followerUser.userId)
                        : () => handleFollow(followerUser.userId)
                    }
                  >
                    {isOwnerFollowing ? 'Unfollow' : 'Follow back'}
                  </Button>
                </div>
              );
            })}
          {type !== 'followers' && (
            <Button
              externalStyle="mt-3 self-center"
              size="large"
              type="submit"
              color="solid"
              disabled={!isDirty || Boolean(Object.keys(errors).length)}
            >
              {type === 'login' && 'Log In'}
              {type === 'signup' && 'Sign Up'}
              {type === 'newTweet' && 'Create tweet'}
              {type === 'editTweet' && 'Edit tweet'}
              {(type === 'avatar' || type === 'cover') && `Change ${type}`}
            </Button>
          )}
        </form>
        <button className="button__close absolute -top-6 -right-6 h-5 w-5" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
