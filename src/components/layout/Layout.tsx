import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
