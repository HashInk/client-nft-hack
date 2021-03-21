import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useScreenSize } from '../../hooks';

export default function Dialog({
  isOpen,
  onClose,
  header,
  children,
  footer,
  disableClose,
}: {
  isOpen: boolean;
  onClose: () => any;
  header: string;
  children: JSX.Element;
  footer?: JSX.Element;
  disableClose?: boolean;
}) {
  const isDesktop = useScreenSize();

  if (!isDesktop) {
    return (
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton isDisabled={disableClose} />
            <DrawerHeader>{header}</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            {footer && <DrawerFooter>{footer}</DrawerFooter>}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={!disableClose}
      closeOnOverlayClick={!disableClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton isDisabled={disableClose} />

        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}
