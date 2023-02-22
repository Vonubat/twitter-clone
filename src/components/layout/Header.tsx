import { NavLink } from 'react-router-dom';

import logo from '../../assets/icons/logo.png';
import { Path } from '../../constants';
import { useTwitter } from '../../hooks';
import { Button } from '../ui/Button';

export const Header = (): JSX.Element => {
  const { ownerId, setShowAuthModal, logOut } = useTwitter();

  const handleLogIn = (): void => {
    setShowAuthModal('login');
  };

  const handleSignUp = (): void => {
    setShowAuthModal('signup');
  };

  const handleLogOut = (): void => {
    logOut();
  };

  return (
    <header className="w-full h-12 flex items-center justify-around">
      <NavLink to={Path.welcomePage}>
        <div className="logo__wrapper flex gap-3">
          <img src={logo} alt="logo icon" />
          <h1 className="font-semibold text-sky-500">Guccitter</h1>
        </div>
      </NavLink>
      <div className="button__wrapper flex gap-3">
        <Button
          externalStyle={ownerId ? 'invisible' : ' visible'}
          size="small"
          type="button"
          color="transparent"
          onClick={handleLogIn}
        >
          Log In
        </Button>
        <Button size="small" type="button" color="solid" onClick={ownerId ? handleLogOut : handleSignUp}>
          {ownerId ? 'Log out' : 'Sign up'}
        </Button>
      </div>
    </header>
  );
};
