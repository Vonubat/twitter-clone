import { Search } from '../components';
import { TypingSvg } from '../constants';

export const WelcomePage = (): JSX.Element => {
  return (
    <main className="welcome-page__wrapper flex grow animate-bg flex-col items-center justify-center gap-20 bg-gradient-to-r from-sky-50 to-sky-500 bg-[length:200%_200%] px-5 py-10 md:flex-row md:items-start">
      <div className="typing-svg__wrapper flex h-[400px] w-[350px] flex-col items-start gap-20 ">
        <img src={TypingSvg.guccitterIsWhat} alt="Typing SVG (Gucciter is what)" />
        <img src={TypingSvg.lifeIsNotAbout} alt="Typing SVG (Life is not about)" />
        <img src={TypingSvg.weServe} alt="Typing SVG (We serve)" />
      </div>
      <Search />
    </main>
  );
};
