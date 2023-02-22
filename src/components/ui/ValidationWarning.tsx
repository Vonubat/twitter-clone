type Props = {
  valid: boolean;
  children: React.ReactNode;
};

export const ValidationWarning: ({ valid, children }: Props) => JSX.Element = ({
  valid,
  children,
}: Props): JSX.Element => {
  const style = {
    base: `text-xs`,
    valid: `text-transparent`,
    invalid: `text-red-700`,
  };

  const className = `${style.base} ${valid ? style.valid : style.invalid}`;

  return <p className={className}>{children}</p>;
};
