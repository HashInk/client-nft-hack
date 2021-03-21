import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Img,
  ListItem,
  OrderedList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import CelebrityProfileComponent from '../../components/CelebrityProfileComponent';
import useStore from '../../store';

const gradient = keyframes`
  0% {
      background-position: 0 0;
    }
  
    50% {
      background-position: 300% 0;
    }
  
    100% {
      background-position: 0 0;
    }
`;

const StyledBox = styled(Center)`
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    background: linear-gradient(
      45deg,
      #f72585,
      #b5179e,
      #7209b7,
      #560bad,
      #480ca8,
      #3a0ca3,
      #3f37c9,
      #4361ee,
      #4895ef,
      #4cc9f0
    );
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: ${gradient} 20s linear infinite;
    border-radius: 0.5rem;
  }

  &:after {
    filter: blur(20px);
  }
`;

export default function Profile() {
  const { toggleRequestModal } = useStore();

  const celebrity = {
    image: '/celebs/justin.jpeg',
    name: 'Justin Shenkarow',
    background: 'Actor',
    price: 200,
    ethPrice: 0.1,
    autograph: '../../assets/white-autograph.png',
    responseTime: '1 day',
    numberOfReviews: 10,
    rating: 4.9,
    fans: '1.2M',
  };

  return (
    <Box>
      <Box pt={{ base: '6rem', md: '8rem' }} pb={{ base: '0', md: '5rem' }}>
        <Container maxW="container.lg">
          <Box textAlign="center" mb="3rem">
            <Flex
              justify="space-between"
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <CelebrityProfileComponent celebrity={celebrity} />
              <StyledBox
                position="relative"
                h={{ base: '120px', md: '240px' }}
                background="linear-gradient(0deg, #000, #262626)"
                borderRadius="0.5rem"
                p="2rem"
              >
                <Img
                  src="/white-autograph.png"
                  alt="autograph"
                  width={{ base: '120px', md: '480px' }}
                  height={{ base: '120px', md: '214px' }}
                />
              </StyledBox>
            </Flex>

            <VStack spacing={8}>
              <Box
                boxShadow="md"
                p="6"
                rounded="md"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                mt="2rem"
                w="100%"
              >
                <StatGroup color="white">
                  <Stat>
                    <StatLabel textAlign="center">⏳ Responds in</StatLabel>
                    <StatNumber alignItems="center" justifyContent="center">
                      {celebrity.responseTime}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>
                      ⭐ Reviews ({celebrity.numberOfReviews})
                    </StatLabel>
                    <StatNumber alignItems="center" justifyContent="center">
                      {celebrity.rating}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>❤️ Fans</StatLabel>
                    <StatNumber alignItems="center" justifyContent="center">
                      {celebrity.fans}
                    </StatNumber>
                  </Stat>
                </StatGroup>
              </Box>

              <Button
                size="lg"
                w="100%"
                colorScheme="blue"
                onClick={toggleRequestModal}
              >
                Request Autograph
              </Button>

              <Popover>
                <PopoverTrigger>
                  <Button size="lg" variant="outline" colorScheme="blue">
                    How does this work?!
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>How does this work?!</PopoverHeader>
                  <PopoverBody>
                    <OrderedList>
                      <ListItem>Request an autograph</ListItem>
                      <ListItem>Wait to hear back from your celeb</ListItem>
                      <ListItem>Collect Autographs</ListItem>
                    </OrderedList>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
