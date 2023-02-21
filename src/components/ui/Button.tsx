type Props = {
  size: 'small' | 'large';
  type: 'button' | 'submit' | 'reset';
  color: 'solid' | 'transparent';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button = ({ size, type, color, disabled, onClick, children }: Props): JSX.Element => {
  const style = {
    base: `font-bold px-4 rounded-full focus:ring focus:ring-blue-300 h-8 text-center`,
    disabledBtn: `pointer-events-none opacity-60`,
    nonDisabledBtn: `hover:shadow-lg focus:shadow-lg active:shadow-lg`,
    btnSize: { small: 'w-28', large: 'w-60' },
    btnColor: {
      solid: 'bg-sky-500 hover:bg-sky-700 text-white active:bg-sky-900',
      transparent:
        'bg-transparent hover:border-2 hover:border-sky-500 text-sky-500 border-transparent active:bg-sky-500 active:text-white',
    },
  };

  const className = `${style.base}
  ${disabled ? style.disabledBtn : style.nonDisabledBtn}
  ${style.btnColor[color]}
  ${style.btnSize[size]}`;

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
