import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiAlignRight } from 'react-icons/fi';

import useStore from '../store';

export default function MobileMenu() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { toggleWalletModal, toggleEnrollModal } = useStore();

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FiAlignRight />} variant="outline" />
      <MenuList>
        <MenuItem minH="48px" onClick={() => router.push('/gallery')}>
          Gallery
        </MenuItem>
        <MenuItem minH="48px" onClick={toggleColorMode}>
          Theme
        </MenuItem>
        <MenuItem minH="48px">Notifications</MenuItem>
        <MenuDivider />
        <MenuItem minH="48px" onClick={toggleEnrollModal}>
          Enroll
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
