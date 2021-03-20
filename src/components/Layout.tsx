import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useEagerConnect, useInactiveListener } from '../hooks';
import Dialogs from './Dialogs';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  if (!triedEager) {
    return null;
  }

  return (
    <>
      <Header />
      <Box as="main">
        {/* h="calc(100vh - 3.5rem)" */}
        {children}
      </Box>

      <Dialogs />
    </>
  );
}
