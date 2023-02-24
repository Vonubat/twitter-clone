import { Outlet } from 'react-router-dom';

import { ModalForm } from '../modal/ModalForm';

import { Header } from './Header';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <ModalForm />
    </>
  );
};
