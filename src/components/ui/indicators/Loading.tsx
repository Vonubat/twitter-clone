type Props = {
  type: 'page' | 'content';
};

export const Loading = ({ type }: Props): JSX.Element => {
  const style = {
    pageContainer: `absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transform `,
    contentContainer: `flex items-center justify-center`,
    page: `h-64 w-64 animate-spin  rounded-full border-8 border-solid border-blue-400 border-t-transparent`,
    content:
      'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-700 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
  };

  return (
    <div className={style[`${type}Container`]}>
      <div className={style[type]} role="status" />
    </div>
  );
};
