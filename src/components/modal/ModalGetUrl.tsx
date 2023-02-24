import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { RenderModalBackdropProps } from 'react-overlays/cjs/Modal';

import closeBtn from '../../assets/icons/close.png';
import { useTwitter } from '../../hooks';
import { CustomFormInputs } from '../../types';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

export const ModalGetUrl = (): JSX.Element => {
  const form = useForm<CustomFormInputs>();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = form;
  const { showGetUrlModal, setShowGetUrlModal, changeImg } = useTwitter();

  const handleClose = (): void => setShowGetUrlModal(null);

  const handleFormSubmit = (data: CustomFormInputs): void => {
    changeImg(data);
    setShowGetUrlModal(null);
  };

  const resetForm: () => void = useCallback((): void => {
    reset({ url: '' });
  }, [reset]);

  useEffect((): void => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, resetForm]);

  const renderBackdrop = (props: RenderModalBackdropProps) => (
    <div className="fixed z-50 top-0 right-0  bottom-0 left-0 bg-black/50" {...props} />
  );

  return (
    <Modal
      className="modal p-7 w-full max-w-[70vw] flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white rounded-md shadow-md"
      show={!!showGetUrlModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title font-semibold text-lg text-black text-opacity-50 text-center">
            {`Paste URL for ${showGetUrlModal} image`}
          </div>
        </div>
        <form className="modal__desc w-full flex flex-col gap-4 pt-5 " onSubmit={handleSubmit(handleFormSubmit)}>
          <InputForm form={form} name="url" type="text" placeholder="URL" />
          <Button
            externalStyle="mt-3 self-center"
            size="large"
            type="submit"
            color="solid"
            disabled={!isDirty || Boolean(Object.keys(errors).length)}
          >
            {`Change ${showGetUrlModal}`}
          </Button>
        </form>
        <button className="button__close w-5 h-5 absolute -top-6 -right-6" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
