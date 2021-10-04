/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { memo, ReactNode, VFC } from 'react';
import { Header } from '../organisms/layout/Header';

type Props = {
  children: ReactNode;
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
