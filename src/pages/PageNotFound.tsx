import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { Button } from '../components';
import { Path } from '../constants';

export const PageNotFound = (): JSX.Element => (
  <main className="page-not-found__wrapper grow animate-bg overflow-hidden bg-gradient-to-r from-rose-50 to-rose-300 bg-[length:200%_200%] ">
    <div className="h-[150px] w-[150px] animate-random-move-x">
      <div className="h-[150px] w-[150px] animate-random-move-y">
        <Logo className="h-[150px] w-[150px] animate-spin" />
      </div>
    </div>
    <div className="page-not-found__message relative z-50 m-auto mb-3 w-80 rounded-md bg-white/70 p-7 text-center">
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
