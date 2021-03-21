import {
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Divider,
  LightMode,
  Stack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import NextLink from 'next/link';
import { createRef, useEffect, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

import Footer from '../components/Footer';
import { toKebabCase } from '../utils';
import { hardCodedCelebs } from '../utils/constants';

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

export default function Landing() {
  const [celebrities, setCelebrities] = useState([
    {
      image: '/justin.jpeg',
      name: 'Justin Shenkarow',
      link: 'justin-shenkarow',
      price: 1000,
      profession: 'Actor / Producer',
    },
    {
      image: '/grimes.jpeg',
      name: 'Grimes',
      link: 'grimes',
      price: 250,
      profession: 'Musician / Songwriter',
    },
    {
      image: '/logan.jpeg',
      name: 'Logan Paul',
      link: 'logan-paul',
      price: 100,
      profession: 'YouTuber / Actor / Influencer,',
    },
    {
      image: '/lindsay.jpeg',
      name: 'Lindsay Lohan Cerny',
      link: 'lindsay-lohan',
      price: 200,
      profession: 'Actress',
    },
    {
      image: '/3lau.jpeg',
      name: '3LAU',
      link: '3lau',
      price: 60,
      profession: 'Musician / DJ / Producer',
    },
  ]);

  useEffect(() => {
    setCelebrities(celebrities.concat(hardCodedCelebs));
  }, []);

  const boxRef = createRef<any>();

  const clickHandler = () => {
    if (!boxRef.current) return;

    boxRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Box>
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
                  bgGradient="linear(to-l, #7928CA,#FF0080, #7928CA)"
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
                fontSize={{ base: 'lg', lg: 'xl' }}
                mt="6"
              >
                HashInk provides NFT autographs, with royalty perks for
                providers and 100% memoribila ownership for the end user.
              </Text>

              <Stack
                mt="10"
                spacing="4"
                justify="center"
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  h="4rem"
                  px="40px"
                  fontSize="1.2rem"
                  as="a"
                  size="lg"
                  colorScheme="blue"
                  onClick={clickHandler}
                  leftIcon={<FiArrowDown />}
                >
                  View Celebrities
                </Button>

                <Button
                  as="a"
                  variant="outline"
                  size="lg"
                  h="4rem"
                  px="40px"
                  fontSize="1.2rem"
                  href="https://github.com/HashInk"
                  target="__blank"
                >
                  GitHub 💻
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>

        <Divider />

        <Box bg="blue.500">
          <Container
            py="120px"
            maxW="1200px"
            px="32px"
            color="white"
            ref={boxRef}
          >
            <Box maxW="560px" mx="auto" textAlign="center" mb="56px">
              <chakra.h2
                textStyle="heading-2"
                mb="4"
                fontSize="2.75rem"
                fontWeight="700"
              >
                Active Individuals 💃
              </chakra.h2>
              <Text fontSize="lg" opacity={0.7}>
                From YouTubers and Instagram stars, Athletes, Musicians, and
                Comedians, and ofcourse, your favorite Crypto voices......
                HashInk is the best way to get close to your favorite icons ✍️
              </Text>
            </Box>

            {celebrities.slice(0, 5).map((celeb: any, key: number) => (
              <Stack
                key={key}
                direction={{ base: 'column', md: 'row' }}
                spacing="6"
                my="1rem"
                maxW="600px"
                mx="auto"
                bg="white"
                color="gray.800"
                shadow="md"
                rounded="lg"
                p="6"
              >
                <Stack flex="1" isInline spacing="6" pr={{ base: 0, md: '4' }}>
                  <Avatar name={celeb.name} src={celeb.image} boxShadow="sm" />
                  <Box flex="1">
                    <Text fontSize="lg" fontWeight="bold" mt="-1">
                      {celeb.name}
                    </Text>
                    <Text opacity={0.7}>{celeb.profession}</Text>
                  </Box>
                </Stack>
                <LightMode>
                  <NextLink href="/[profile]" as={`/${celeb.link}`} passHref>
                    <Button
                      w={{ base: '100%', md: 'auto' }}
                      alignSelf="center"
                      as="a"
                      minW="7rem"
                      colorScheme="blue"
                      href="abc"
                      rel="noopener"
                      target="_blank"
                      isDisabled={celeb.name !== 'Justin Shenkarow'}
                    >
                      View
                    </Button>
                  </NextLink>
                </LightMode>
              </Stack>
            ))}

            <Box maxW="500px" mx="auto" textAlign="center">
              <chakra.p
                textStyle="caps"
                mb="8"
                mt="4rem"
                textTransform="uppercase"
              >
                And many more...
              </chakra.p>
              <Wrap justify="center">
                {celebrities.slice(5, 25).map((celeb, i) => (
                  <WrapItem key={i}>
                    <Tooltip
                      label={celeb.name}
                      aria-label={celeb.name}
                      color="white"
                    >
                      <Avatar
                        name={celeb.name}
                        src={celeb.image}
                        size="lg"
                        bgColor="pink.500"
                        color="white"
                      />
                    </Tooltip>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
