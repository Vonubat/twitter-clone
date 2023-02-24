import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { Button } from '../components';
import { Path } from '../constants';

export const PageNotFound = (): JSX.Element => (
  <main className="page-not-found__wrapper animate-bg bg-[length:200%_200%] bg-gradient-to-r from-rose-50 to-rose-300 grow overflow-hidden ">
    <div className="h-[150px] w-[150px] animate-random-move-x">
      <div className="h-[150px] w-[150px] animate-random-move-y">
        <Logo className="h-[150px] w-[150px] animate-spin" />
      </div>
    </div>
    <div className="page-not-found__message relative bg-white/70 rounded-md m-auto text-center w-80 p-7 z-50 mb-3">
      <h2 className="text-2xl font-bold">404</h2>
      <h3 className="text-xl font-semibold">Page not found</h3>
      <p className="my-5">
        The page you are looking for doesn&apos;t exist. How you got here is a mystery. But you can click the button
        below to go back to the welcome page
      </p>
      <NavLink to={Path.welcomePage}>
        <Button size="large" type="button" color="transparent">
          Let&apos;s start again
        </Button>
      </NavLink>
    </div>
  </main>
);
