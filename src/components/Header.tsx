import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiMoon, FiSun } from 'react-icons/fi';

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

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
    </Flex>
  );
}
