import { Outlet } from 'react-router-dom';

import { ModalAuth } from '../modal/ModalAuth';

import { Header } from './Header';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <ModalAuth />
    </>
  );
};
