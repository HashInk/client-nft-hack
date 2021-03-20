import { Flex, Stack, Text } from '@chakra-ui/react';

export default function Error(): JSX.Element {
  return (
    <Flex flexGrow={1} alignItems="center" justifyContent="center" pt="5rem">
      <Stack direction="column" alignItems="center">
        <Text fontSize="1.5rem">Something went wrong.</Text>
        <Text>Try refreshing the page.</Text>
      </Stack>
    </Flex>
  );
}
