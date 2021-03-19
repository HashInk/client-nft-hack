import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box as="main">
        {/* h="calc(100vh - 3.5rem)" */}
        {children}
      </Box>
      <Footer />
    </>
  );
}
