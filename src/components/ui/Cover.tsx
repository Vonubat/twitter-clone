import defaultCover from '../../assets/default_cover.png';

type Props = {
  src: string | null;
};

export const Cover = ({ src }: Props): JSX.Element => {
  return <img className="max-h-[500px] w-full object-cover" src={src || defaultCover} alt="User cover" />;
};
