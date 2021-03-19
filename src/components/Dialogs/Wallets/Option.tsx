import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

import getIcon from '../../../assets/icons';

export default function Option({
  name,
  icon,
  active = false,
  onClick,
  link,
  id,
}: {
  name?: React.ReactNode;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
  link?: string | null;
  id: string;
}): JSX.Element {
  const content = (
    <Flex
      alignItems="center"
      borderRadius="base"
      justifyContent="space-between"
      my="0.5rem"
      p="0.75rem 1rem"
      textAlign="center"
      transition="all 0.3s ease 0s"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
      key={id}
      onClick={onClick}
      cursor={!active ? 'pointer' : undefined}
      bgColor={!active ? 'blue.100' : 'blue.200'}
      color="white"
      _hover={
        !active
          ? {
              bgColor: 'blue.200',
              textDecoration: 'none',
            }
          : undefined
      }
    >
      {icon ? getIcon(icon) : null}
      <Text fontSize="1.25rem" fontWeight="600" m="0">
        {name}
      </Text>
      {active ? <Icon as={FiCheckCircle} color="green.400" /> : <Box w="5%" />}
    </Flex>
  );

  if (link)
    return (
      <Link
        href={link}
        color="white"
        isExternal
        _focus={{ boxShadow: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        {content}
      </Link>
    );

  return content;
}
