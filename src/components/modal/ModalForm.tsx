import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-overlays/cjs/Modal';

import closeBtn from '../../assets/icons/close.png';
import { ValidationMsg } from '../../constants';
import { useTwitter } from '../../hooks';
import { modalSelector, setModalForm, useAppDispatch, useAppSelector } from '../../redux';
import { CustomFormInputs } from '../../types';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

import { Backdrop } from './Backdrop';

export const ModalForm = (): JSX.Element => {
  const { logIn, signUp, changeImg, addTweet, editTweet } = useTwitter();
  const { modalForm } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

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

  const handleFormSubmit = (data: CustomFormInputs): void => {
    if (modalForm?.type === 'login') {
      const res = logIn(data);

      if (res === ValidationMsg.cantFindUser) {
        setError('username', {
          type: 'manual',
          message: ValidationMsg.cantFindUser,
        });

        setError('password', {
          type: 'manual',
          message: ValidationMsg.cantFindUser,
        });

        return;
      }
    }

    if (modalForm?.type === 'signup') {
      const res = signUp(data);

      if (res === ValidationMsg.userIsExist) {
        setError('username', {
          type: 'manual',
          message: ValidationMsg.userIsExist,
        });

        return;
      }
    }

    if (modalForm?.type === 'avatar' || modalForm?.type === 'cover') {
      changeImg(data);
    }

    if (modalForm?.type === 'newTweet') {
      addTweet(data);
    }

    if (modalForm?.type === 'editTweet') {
      editTweet({ ...data, tweetId: modalForm.tweetId });
    }

    dispatch(setModalForm(null));
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
      setValue('contentTextarea', modalForm.text);
    }

    if (modalForm?.type === 'newTweet') {
      setValue('contentTextarea', '');
    }
  }, [setValue, modalForm]);

  return (
    <Modal
      className={`modal fixed top-1/2 left-1/2 z-50 flex ${
        modalForm?.type === 'signup' || modalForm?.type === 'login' ? 'w-[300px]' : 'w-full min-w-[300px] max-w-[70vw]'
      } -translate-y-1/2 -translate-x-1/2 flex-col items-center rounded-md bg-white p-7 shadow-md outline-none`}
      show={!!modalForm}
      onHide={handleClose}
      renderBackdrop={Backdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title text-center text-lg font-semibold text-black text-opacity-50">
            {modalForm?.type === 'login' && 'Log In'}
            {modalForm?.type === 'signup' && 'Sign Up'}
            {modalForm?.type === 'newTweet' && 'Create new tweet'}
            {modalForm?.type === 'editTweet' && 'Edit your tweet'}
            {(modalForm?.type === 'avatar' || modalForm?.type === 'cover') && `Paste URL for ${modalForm?.type} image`}
          </div>
          {modalForm?.type === 'signup' && (
            <button
              className="modal__link text-sm text-black  text-opacity-50 underline-offset-4 hover:underline"
              onClick={() => dispatch(setModalForm({ type: 'login' }))}
            >
              Already signed up?
            </button>
          )}
        </div>
        <form className="modal__desc flex w-full flex-col gap-4 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
          {(modalForm?.type === 'signup' || modalForm?.type === 'login') && (
            <InputForm form={form} name="username" type="text" placeholder="Nickname" />
          )}
          {(modalForm?.type === 'signup' || modalForm?.type === 'login') && (
            <InputForm form={form} name="password" type="password" placeholder="Password" />
          )}
          {modalForm?.type === 'signup' && (
            <InputForm form={form} name="firstName" type="text" placeholder="First Name" />
          )}
          {modalForm?.type === 'signup' && (
            <InputForm form={form} name="lastName" type="text" placeholder="Last Name" />
          )}
          {modalForm?.type === 'signup' && <InputForm form={form} name="location" type="text" placeholder="Location" />}
          {(modalForm?.type === 'avatar' || modalForm?.type === 'cover') && (
            <InputForm form={form} name="url" type="text" placeholder="URL" />
          )}
          {(modalForm?.type === 'newTweet' || modalForm?.type === 'editTweet') && (
            <InputForm form={form} name="contentTextarea" type="text" placeholder="Write a tweet..." />
          )}
          <Button
            externalStyle="mt-3 self-center"
            size="large"
            type="submit"
            color="solid"
            disabled={!isDirty || Boolean(Object.keys(errors).length)}
          >
            {modalForm?.type === 'login' && 'Log In'}
            {modalForm?.type === 'signup' && 'Sign Up'}
            {modalForm?.type === 'newTweet' && 'Create tweet'}
            {modalForm?.type === 'editTweet' && 'Edit tweet'}
            {(modalForm?.type === 'avatar' || modalForm?.type === 'cover') && `Change ${modalForm?.type}`}
          </Button>
        </form>
        <button className="button__close absolute -top-6 -right-6 h-5 w-5" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
