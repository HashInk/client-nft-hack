import {
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiGrid, FiLogIn, FiMoon, FiSun, FiUser } from 'react-icons/fi';

import useStore from '../store';
import { shortenAddress } from '../utils';
import Notifications from './Notifications';

export default function Header() {
  const { library, chainId, account } = useWeb3React();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [ENSName, setENSName] = useState('');
  const { toggleWalletModal } = useStore();

  useEffect(() => {
    if (library && account) {
      let stale = false;
      library
        .lookupAddress(account)
        .then((name: string) => {
          if (!stale && typeof name === 'string') {
            if (name.length > 12) setENSName(name.substr(0, 8) + '...');
            else setENSName(name);
          }
        })
        .catch(() => {}); // eslint-disable-line
      return (): void => {
        stale = true;
        setENSName('');
      };
    }
  }, [library, account, chainId]);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px={['0.5rem', '0.5rem', '1rem']}
      bgColor="white"
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
      borderTop="6px solid #e6007a"
    >
      <Link onClick={() => router.push('/')}>
        <Text fontSize="2rem" fontWeight="2rem">
          🔏 HashInk
        </Text>
      </Link>
      <HStack>
        {/* <Button
          colorScheme="blue"
          opacity={0.8}
          color="white"
          isRound
          aria-label="gallery"
          onClick={() => router.push('/celebrity')}
        >
          Celeb POV
        </Button> */}
        <IconButton
          colorScheme="blue"
          opacity={0.8}
          color="white"
          isRound
          onClick={toggleColorMode}
          aria-label="toggle theme"
          icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
        />
        <IconButton
          colorScheme="blue"
          opacity={0.8}
          color="white"
          isRound
          aria-label="gallery"
          onClick={() => router.push('/gallery')}
          icon={<FiGrid />}
          isDisabled={!account}
        />

        <Notifications />

        {!account ? (
          <IconButton
            isRound
            opacity={0.8}
            colorScheme="blue"
            color="white"
            icon={<FiLogIn />}
            onClick={() => toggleWalletModal()}
            aria-label="connect"
          />
        ) : (
          <Button
            opacity={0.8}
            color="white"
            colorScheme="blue"
            leftIcon={<FiUser />}
            onClick={() => toggleWalletModal()}
          >
            {ENSName || `${shortenAddress(account)}`}
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
