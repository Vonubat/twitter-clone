import { RenderModalBackdropProps } from 'react-overlays/cjs/Modal';

export const Backdrop = (props: RenderModalBackdropProps): JSX.Element => (
  <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black/50" {...props} />
);
