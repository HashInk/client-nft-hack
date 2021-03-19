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
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import faker from 'faker';
import Link from 'next/link';
import { createRef, useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';

import { toKebabCase } from '../utils';

export default function MyApp() {
  const [celebrities, setCelebrities] = useState([]);

  useEffect(() => {
    const newName = faker.name.findName();
    setCelebrities(
      Array(5).fill({
        image:
          'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?quality=90&resize=620,413',
        name: newName,
        link: toKebabCase(newName),
        price: faker.random.number(),
        profession: 'Actor / Producer - Show Y, Movie Z',
        autograph:
          'https://www.instantautographs.com/assets/ia-autograph-ddb0d9e55cf90a6d191a329322c6808d8bc991510b6f7902e377f368f962c8bb.png',
      }),
    );
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
      <Box mb={20}>
        <Box
          as="section"
          pt={{ base: '10rem', md: '12rem' }}
          pb={{ base: '0', md: '5rem' }}
        >
          <Container>
            <Box textAlign="center">
              <chakra.h1
                maxW="16ch"
                mx="auto"
                fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
                letterSpacing="tighter"
                fontWeight="extrabold"
                mb="16px"
                lineHeight="1.2"
              >
                Digital autographs, starring your
                <Box
                  as="span"
                  color={useColorModeValue('blue.500', 'blue.300')}
                >
                  {' '}
                  favorite icons
                </Box>
              </chakra.h1>

              <Text
                maxW="560px"
                mx="auto"
                opacity={0.7}
                fontSize={{ base: 'lg', lg: 'xl' }}
                mt="6"
              >
                Some text here about what we bring to celebrities and the
                fans... Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid labore dolore sint esse earum id, corrupti, officiis
                natus magni, quaerat ea quisquam numquam sit ullam deserunt
                nihil. Facere, ipsum nesciunt?
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
                  leftIcon={<AiFillGithub size="1.5em" />}
                >
                  GitHub
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
                Comedians, and ofcourse, your favorite Crypto voices...... Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
                molestias officia consequatur tenetur magni amet voluptates
                numquam? ✍️
              </Text>
            </Box>

            {celebrities.map((celeb: any, key: number) => (
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
                  <Avatar name={celeb.name} src={celeb.image} />
                  <Box flex="1">
                    <Text fontSize="lg" fontWeight="bold" mt="-1">
                      {celeb.name}
                    </Text>
                    <Text opacity={0.7}>{celeb.profession}</Text>
                  </Box>
                </Stack>
                <LightMode>
                  <Link href="/[profile]" as={`/${celeb.link}`}>
                    <Button
                      w={{ base: '100%', md: 'auto' }}
                      alignSelf="center"
                      as="a"
                      minW="7rem"
                      colorScheme="blue"
                      href="#"
                      rel="noopener"
                      target="_blank"
                    >
                      View
                    </Button>
                  </Link>
                </LightMode>
              </Stack>
            ))}

            <Box maxW="600px" mx="auto" textAlign="center">
              <chakra.p
                textStyle="caps"
                mb="8"
                mt="4rem"
                textTransform="uppercase"
              >
                And many more...
              </chakra.p>
              <Wrap justify="center">
                {celebrities.map((celeb, i) => (
                  <WrapItem key={i}>
                    <Avatar name={celeb.name} src={celeb.image} size="lg" />
                  </WrapItem>
                ))}
                {celebrities.map((celeb, i) => (
                  <WrapItem key={i}>
                    <Avatar name={celeb.name} src={celeb.image} size="lg" />
                  </WrapItem>
                ))}
                {celebrities.map((celeb, i) => (
                  <WrapItem key={i}>
                    <Avatar name={celeb.name} src={celeb.image} size="lg" />
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
