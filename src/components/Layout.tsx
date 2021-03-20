import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Dialogs from './Dialogs';
import Header from './Header';
import Web3Manager from './Web3Manager';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <>
        <Header />
        <Box as="main">
          {/* h="calc(100vh - 3.5rem)" */}
          {children}
        </Box>

        <Dialogs />
      </>
    </>
  );
}
