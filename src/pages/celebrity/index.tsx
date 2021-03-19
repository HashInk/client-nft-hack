import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import faker from 'faker';
import { useEffect, useState } from 'react';

import withPrivateRoute from '../../components/withPrivateRoute';
import useStore from '../../store';
import { toKebabCase } from '../../utils';

function Profile() {
  const { toggleSignModal } = useStore();
  const [celebs, setCelebs] = useState([]);

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
    image:
      'https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?quality=90&resize=620,413',
    name: 'Joe Schmoe',
    price: 100,
    autograph:
      'https://www.instantautographs.com/assets/ia-autograph-ddb0d9e55cf90a6d191a329322c6808d8bc991510b6f7902e377f368f962c8bb.png',
    responseTime: '1 day',
    numberOfReviews: 10,
    rating: 4.9,
    fans: 30000,
    isAccepting: false,
  };

  return (
    <Container maxW="container.lg">
      <Grid templateColumns="repeat(1, 1fr)" gap={2}>
        {celebs.map((celeb: any, key: number) => (
          <GridItem w="100%" key={key}>
            <Box
              p="5"
              borderWidth="1px"
              rounded="md"
              my="0.5rem"
              onClick={toggleSignModal}
              cursor="pointer"
            >
              Sign
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

Profile.getInitialProps = async (props) => {
  console.info('##### Congratulations! You are authorized! ######', props);
  return {};
};

export default withPrivateRoute(Profile);
