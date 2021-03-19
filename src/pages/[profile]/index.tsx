import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
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
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiClock, FiHeart, FiStar } from 'react-icons/fi';

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
      #fb0094,
      #0000ff,
      #0f0,
      #ff0,
      #f00,
      #fb0094,
      #0000ff,
      #0f0,
      #ff0,
      #f00
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
  const router = useRouter();
  const { id, comment } = router.query;
  console.log('comment:', comment);

  const celebrity = {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?quality=90&resize=620,413',
    name: 'Joe Schmoe',
    background: 'Actor',
    price: 100,
    autograph: '../../assets/white-autograph.png',
    responseTime: '1 day',
    numberOfReviews: 10,
    rating: 4.9,
    fans: 30000,
  };
  return (
    <Box>
      <Box pt={{ base: '10rem', md: '12rem' }} pb={{ base: '0', md: '5rem' }}>
        <Container maxW="container.lg">
          <Box textAlign="center" mb="3rem">
            <Flex justify="space-between">
              <Avatar
                h="15rem"
                w="15rem"
                name={celebrity.name}
                src={celebrity.image}
                boxShadow="md"
              />

              <Flex
                justify="flex-start"
                align="flex-start"
                direction="column"
                textAlign="left"
                ml="1rem"
                lineHeight="3rem"
              >
                <Text fontSize="3rem" fontWeight="700">
                  {celebrity.name}
                </Text>

                <Text fontSize="1.5rem" fontWeight="400" color="gray" mt="0">
                  {celebrity.background} - {celebrity.price}
                </Text>
              </Flex>
              <StyledBox
                position="relative"
                h="250px"
                background="linear-gradient(0deg, #000, #262626)"
                borderRadius="0.5rem"
                p="2rem"
              >
                <Image
                  src="/white-autograph.png"
                  alt="autograph"
                  width="448"
                  height="200"
                />
              </StyledBox>
            </Flex>

            <Box
              boxShadow="md"
              p="6"
              rounded="md"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              my="2rem"
            >
              <StatGroup color="white">
                <Stat>
                  <StatLabel>Responds in</StatLabel>
                  <StatNumber alignItems="center" justifyContent="center">
                    <Icon as={FiClock} />
                    {celebrity.responseTime}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Reviews ({celebrity.numberOfReviews})</StatLabel>
                  <StatNumber alignItems="center" justifyContent="center">
                    <Icon as={FiStar} />
                    {celebrity.rating}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Fans</StatLabel>
                  <StatNumber alignItems="center" justifyContent="center">
                    <Icon as={FiHeart} />
                    {celebrity.fans}
                  </StatNumber>
                </Stat>
              </StatGroup>
            </Box>
            <VStack>
              <Button
                size="lg"
                p="1.6rem 1.8rem"
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
                      <ListItem>Lorem ipsum dolor sit amet</ListItem>
                      <ListItem>Consectetur adipiscing elit</ListItem>
                      <ListItem>Integer molestie lorem at massa</ListItem>
                      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
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
