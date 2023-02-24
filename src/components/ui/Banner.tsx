import bannerBird from '../../assets/banner_bird.png';
import { useTwitter } from '../../hooks';

import { Button } from './Button';

export const Banner = (): JSX.Element => {
  const { setShowAuthModal } = useTwitter();

  const handleSignUp = (): void => {
    setShowAuthModal('signup');
  };

  return (
    <div className="banner__wrapper flex h-[320px] w-[250px] flex-col items-center rounded-md bg-white">
      <img src={bannerBird} alt="banner bird" />
      <div className="heading__wrapper text-center font-semibold text-black">
        <h3>Hey!</h3>
        <h3>Why don&apos;t you join us?</h3>
      </div>
      <div className="text__wrapper p-3 text-center text-sm text-black text-opacity-50">
        <p>It&apos;s simple - just click on sign up button!</p>
      </div>
      <Button size="small" type="button" color="solid" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};
