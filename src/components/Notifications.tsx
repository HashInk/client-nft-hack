import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Link,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { FiBell } from 'react-icons/fi';

import useStore from '../store';
import { getEtherscanLink, shortenAddress } from '../utils';

export default function Notifications() {
  const notifications = useStore((state) => state.notifications);
  console.log('notifications:', notifications);
  const { chainId } = useWeb3React();

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <IconButton
          isRound
          colorScheme="blue"
          color="white"
          aria-label="notifications"
          icon={<FiBell aria-label="notifications" />}
        />
      </PopoverTrigger>
      <PopoverContent bgColor="background.100">
        <PopoverCloseButton />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverBody>
          <Box maxHeight="200px" overflow="auto" textAlign="center">
            {notifications.length === 0 ? (
              <Text textAlign="center" lineHeight="3rem">
                No notifications
              </Text>
            ) : (
              notifications.map((notification: any, index: number) => (
                <Link
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                  p="0.5rem"
                  textDecoration="none"
                  _hover={{
                    bgColor: 'blue.200',
                    cursor: 'pointer',
                  }}
                  href={
                    chainId
                      ? getEtherscanLink(chainId, notification, 'transaction')
                      : ''
                  }
                  target="_blank"
                  key={index}
                  borderRadius="0.25rem"
                >
                  <Box flexGrow={1} pr="1.5rem">
                    <Text fontWeight="600" mb="0.5rem">
                      Request sent
                    </Text>
                    <Text
                      color="text.100"
                      fontSize="1rem"
                      fontWeight="400"
                      m="0"
                    >
                      {shortenAddress(notification)}
                    </Text>
                  </Box>
                </Link>
              ))
            )}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
