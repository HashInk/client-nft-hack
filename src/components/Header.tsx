import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiGrid, FiLogIn, FiMoon, FiSun, FiUser } from 'react-icons/fi';

import useStore from '../store';
import { shortenAddress } from '../utils';
import { JustinsAccount } from '../utils/constants';
import MobileMenu from './MobileMenu';
import Notifications from './Notifications';

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

export default function Header() {
  // const { library, chainId, account } = useWeb3React();
  // const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  // const [ENSName, setENSName] = useState('');
  // const { toggleWalletModal, toggleEnrollModal } = useStore();

  // useEffect(() => {
  //   if (library && account) {
  //     let stale = false;
  //     library
  //       .lookupAddress(account)
  //       .then((name: string) => {
  //         if (!stale && typeof name === 'string') {
  //           if (name.length > 12) setENSName(name.substr(0, 8) + '...');
  //           else setENSName(name);
  //         }
  //       })
  //       .catch(() => {}); // eslint-disable-line
  //     return (): void => {
  //       stale = true;
  //       setENSName('');
  //     };
  //   }
  // }, [library, account, chainId]);

  return (
    <Flex
      alignItems="center"
      direction="column"
      justifyContent="space-between"
      zIndex="5"
      minH="3.5rem"
      h="3.5rem"
      m="0 auto"
      position="fixed"
      top="0"
      userSelect="none"
      w="100%"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
      as="header"
      // borderTop="6px solid #e6007a"
      bgColor={useColorModeValue('white', '#e6007a')}
    >
      <Box
        w="100%"
        h="1rem"
        animation={`${shine} 10s ease-in-out infinite`}
        backgroundSize="200% auto"
        bgGradient="linear(to-l, #7928CA, #FF0080, #7928CA)"
      />
      <HStack
        alignItems="center"
        justify="space-between"
        w="100%"
        px={['0.5rem', '0.5rem', '1rem']}
      >
        <Text
          fontSize="2rem"
          fontWeight="600"
          color={useColorModeValue('black', 'white')}
        >
          🔏 HashInk
        </Text>{' '}
        <IconButton
          colorScheme="blue"
          color="white"
          isRound
          onClick={toggleColorMode}
          aria-label="toggle theme"
          icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
        />
      </HStack>
      {/* <HStack display={{ base: 'none ', md: 'flex' }}> */}
      {/* <Notifications /> */}
      {/* <IconButton
          colorScheme="blue"
          color="white"
          isRound
          onClick={toggleColorMode}
          aria-label="toggle theme"
          icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
        /> */}
      {/* <IconButton
          display={account === JustinsAccount ? 'none' : 'inline-flex'}
          colorScheme="blue"
          color="white"
          isRound
          aria-label="gallery"
          onClick={() => router.push('/gallery')}
          icon={<FiGrid />}
          isDisabled={!account}
        /> */}
      {/* {!account ? (
          <IconButton
            isRound
            colorScheme="blue"
            color="white"
            icon={<FiLogIn />}
            onClick={() => toggleWalletModal()}
            aria-label="connect"
          />
        ) : (
          <Button
            color="white"
            colorScheme="blue"
            leftIcon={<FiUser />}
            onClick={() => toggleWalletModal()}
          >
            {ENSName || `${shortenAddress(account)}`}
          </Button>
        )} */}
      {/* <Button
          display={account ? 'none' : 'block'}
          onClick={() => toggleEnrollModal()}
          color="white"
          colorScheme="blue"
        >
          Enroll
        </Button> */}
      {/* </HStack> */}
      {/* <HStack display={{ base: 'block', md: 'none' }}>
        <IconButton
          isRound
          colorScheme="blue"
          color="white"
          icon={<FiUser />}
          // onClick={() => toggleWalletModal()}
          aria-label="account"
        />
        <MobileMenu />
      </HStack> */}
    </Flex>
  );
}
