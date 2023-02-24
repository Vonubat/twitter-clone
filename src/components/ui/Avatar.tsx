import defaultAvatar from '../../assets/default_avatar.png';

type Props = {
  src: string | null;
};

export const Avatar = ({ src }: Props): JSX.Element => {
  return (
    <img
      className="absolute -bottom-[35px] left-[13%] h-[70px] w-[70px] rounded-full border-4 border-solid border-white object-cover sm:-bottom-[55px] sm:h-[110px] sm:w-[110px] md:-bottom-[75px] md:h-[150px] md:w-[150px] lg:-bottom-[105px] lg:h-[210px] lg:w-[210px]"
      src={src || defaultAvatar}
      alt="User avatar"
    />
  );
};
