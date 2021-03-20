import {
  Avatar,
  Box,
  chakra,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Img,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import faker from 'faker';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import useStore from '../store';
import { toKebabCase } from '../utils';

function AutographCard({
  celeb,
  toggleViewModal,
}: {
  celeb: any;
  toggleViewModal: () => any;
}) {
  return (
    <Flex>
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        rounded="12px"
        shadow="base"
        p="40px"
      >
        <Avatar name={celeb.name} src={celeb.image} border="1px solid blue" />
        <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
          {celeb.name}
        </Heading>
        <Text fontSize="lg" opacity={0.7}>
          {celeb.profession}
        </Text>

        <Box
          bg="white"
          rounded="12px"
          shadow="base"
          p="40px"
          mt="1rem"
          onClick={() => toggleViewModal()}
          cursor="pointer"
        >
          <Image
            src="/black-autograph.png"
            alt="autograph"
            width="448"
            height="200"
          />
        </Box>
      </Box>
    </Flex>
  );
}

export default function UserGallery() {
  const [celebs, setCelebs] = useState([]);
  const { toggleViewModal } = useStore();

  useEffect(() => {
    const newName = faker.name.findName();
    setCelebs(
      Array(10).fill({
        image:
          'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?quality=90&resize=620,413',
        name: newName,
        link: toKebabCase(newName),
        price: faker.random.number(),
        profession: 'Actor / Producer',
        autograph:
          'https://www.instantautographs.com/assets/ia-autograph-ddb0d9e55cf90a6d191a329322c6808d8bc991510b6f7902e377f368f962c8bb.png',
      }),
    );
  }, []);

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container py="120px" maxW="1280px">
        <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
          <chakra.h2 mb="5" fontSize="3.5rem" fontWeight="700">
            My autograph gallery 🖼
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize="1.125rem">
            View and share all of your recently collected signatures
          </chakra.p>
        </Box>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          gap={10}
          px={{ md: 12 }}
        >
          {celebs.map((celeb: any, key: number) => (
            <GridItem w="100%" key={key}>
              <AutographCard celeb={celeb} toggleViewModal={toggleViewModal} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
