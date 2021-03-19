import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

export default function Notifications() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Tooltip label="notifications" aria-label="notifications">
          <IconButton
            isRound
            colorScheme="blue"
            opacity={0.8}
            color="white"
            aria-label="notifications"
            icon={<FiBell aria-label="notifications" />}
          />
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent bgColor="background.100">
        <PopoverCloseButton />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverBody>
          <Box maxHeight="200px" overflow="auto" textAlign="center">
            No Notifcations
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
