import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import faker from 'faker';
import { useEffect, useState } from 'react';

import AutographRequest from '../abis/AutographRequestContract.json';
import CelebrityProfileComponent from '../components/CelebrityProfileComponent';
import withPrivateRoute from '../components/withPrivateRoute';
import { useContract } from '../hooks';
import useStore from '../store';
import { toKebabCase } from '../utils';
import { addresses } from '../utils/addresses';

export default function Requests({ token }: { token: any }) {
  const { toggleSignModal } = useStore();
  const [celebs, setCelebs] = useState([]);

  const contract = useContract(
    addresses.autographRequest,
    AutographRequest.abi,
  );

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log('contract:', contract);
  //       const value = await contract.getRequest(0);
  //       console.log('value:', value);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [contract]);

  useEffect(() => {
    const newName = faker.name.findName();
    setCelebs(
      Array(10).fill({
        image:
          'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?quality=90&resize=620,413',
        name: newName,
        link: toKebabCase(newName),
        price: faker.random.number(),
        autograph:
          'https://www.instantautographs.com/assets/ia-autograph-ddb0d9e55cf90a6d191a329322c6808d8bc991510b6f7902e377f368f962c8bb.png',
      }),
    );
  }, []);

  const celebrity = {
    image: '/celebs/justin.jpeg',
    name: 'Justin Shenkarow',
    background: 'Actor',
    price: 1000,
    ethPrice: 0.1,
    autograph: '../../assets/white-autograph.png',
    responseTime: '1 day',
    numberOfReviews: 10,
    rating: 4.9,
    fans: '1.2M',
  };

  return (
    <Container maxW="container.lg" mt="5rem">
      <CelebrityProfileComponent celebrity={celebrity} />
      <Divider my={2} />
      <Grid templateColumns="repeat(1, 1fr)" gap={2}>
        {celebs.map((celeb: any, key: number) => (
          <GridItem
            w="100%"
            key={key}
            borderWidth="1px"
            rounded="md"
            my="0.5rem"
          >
            <Flex p="1rem" align="center" justify="space-between">
              <Box>
                <Text fontWeight="700" fontSize="1.5rem">
                  A new request
                </Text>{' '}
                <Divider orientation="vertical" />{' '}
                <Text>Click for more details</Text>
              </Box>
              <Button size="lg" onClick={toggleSignModal} colorScheme="pink">
                Click
              </Button>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || '' } };
}

// Profile.getInitialProps = async (props) => {
//   console.info('##### Congratulations! You are authorized! ######', props);
//   return {};
// };

// export default withPrivateRoute(Profile);
