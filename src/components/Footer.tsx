import { Flex, Img } from '@chakra-ui/react';

import EthGlobalLogo from '../assets/ethglobal-logo';

export default function Footer() {
  return (
    <Flex align="center" justify="space-around" my="1rem" as="footer">
      <Img
        src="https://nfthack.ethglobal.co/static/media/nfthack-logo.7a927aff.svg"
        alt="NFT Hack Logo"
        h="5rem"
      />
      <EthGlobalLogo />
    </Flex>
  );
}
