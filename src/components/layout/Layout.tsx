import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ModalForm } from '../modal/ModalForm';
import { ModalTweet } from '../modal/ModalTweet';

import { Header } from './Header';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <ModalForm />
      <ModalTweet />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </>
  );
};
