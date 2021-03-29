import { Box, Button, chakra, Container, Stack, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

import useStore from '../store';

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

export default function Landing() {
  const { toggleVideoModal, toggleEmailModal } = useStore();

  return (
    <Box
      as="section"
      pt={{ base: '6rem', md: '12rem' }}
      pb={{ base: '0', md: '8rem' }}
    >
      <Container>
        <Box textAlign="center" mb="3rem">
          <chakra.h1
            maxW="20ch"
            mx="auto"
            fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
            letterSpacing="tighter"
            fontWeight="extrabold"
            mb="16px"
            lineHeight="1.2"
          >
            Digital autographs, guest starring your{' '}
            <chakra.span
              animation={`${shine} 10s ease-in-out infinite`}
              backgroundSize="200% auto"
              bgGradient="linear(to-l, #7928CA, #FF0080, #7928CA)"
              bgClip="text"
              fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
              fontWeight="extrabold"
              px="0.5rem"
            >
              favorite icons.
            </chakra.span>
          </chakra.h1>

          <Text
            maxW="560px"
            mx="auto"
            opacity={0.7}
            fontSize={{ base: '1.125rem', lg: '1.25rem' }}
            mt="6"
          >
            HashInk provides NFT autographs, with royalty perks for providers
            and 100% memoribila ownership for the end user.
          </Text>

          <Stack
            mt="10"
            spacing="4"
            justify="center"
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              h="4rem"
              size="lg"
              px="40px"
              fontSize="1.2rem"
              colorScheme="blue"
              onClick={() => toggleVideoModal()}
            >
              🎥 Presentation
            </Button>

            <Button
              variant="outline"
              size="lg"
              h="4rem"
              px="40px"
              fontSize="1.2rem"
              onClick={() => toggleEmailModal()}
            >
              Stay connected ✉️
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
