import { Avatar, Flex, Text } from '@chakra-ui/react';
import { constants } from 'ethers';

export default function CelebrityProfileComponent({
  celebrity,
}: {
  celebrity: any;
}) {
  return (
    <Flex
      justify={{ base: 'space-between', md: 'flex-start' }}
      align={{ base: 'center', md: 'flex-start' }}
      direction={{ base: 'row', md: 'column' }}
      textAlign="left"
      ml="1rem"
      lineHeight="3rem"
      mb={{ base: '1rem', md: '0' }}
    >
      <Avatar
        h={{ base: '8rem', md: '10rem' }}
        w={{ base: '8rem', md: '10rem' }}
        name={celebrity.name}
        src={celebrity.image}
        boxShadow="md"
        border="0.5rem solid #e6007a"
        order={{ base: 2, md: 1 }}
      />
      <Flex direction="column" order={{ base: 1, md: 2 }}>
        <Text fontSize="3rem" fontWeight="700">
          {celebrity.name}
        </Text>

        <Text fontSize="1.5rem" fontWeight="400" color="gray" mt="0">
          {celebrity.background} - ${celebrity.price} / {constants.EtherSymbol}{' '}
          {celebrity.ethPrice}
        </Text>
      </Flex>
    </Flex>
  );
}
