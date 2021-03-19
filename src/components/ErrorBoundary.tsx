import { Code, Text, VStack } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';

export default function ErrorFallback({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  function FallbackComponent({ error }: { error: Error }): JSX.Element {
    return (
      <VStack role="alert" align="flex-start" p="1rem" w="100%">
        <Text>Something went wrong...</Text>
        <Code colorScheme="pink">{error.message}</Code>
      </VStack>
    );
  }
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
}
