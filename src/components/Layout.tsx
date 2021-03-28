import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Dialogs from './Dialogs';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box as="main">{children}</Box>
      <Dialogs />
    </>
  );
}
