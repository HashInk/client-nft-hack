import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Img,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import useStore from '../../store';
import Dialog from './Dialog';

export default function Request() {
  const { requestModalIsOpen, toggleRequestModal } = useStore();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  function onSend() {
    toggleRequestModal();
  }
  return (
    <Dialog
      isOpen={requestModalIsOpen}
      onClose={toggleRequestModal}
      header="Request"
      footer={
        <>
          <Button variant="ghost" mr={3} onClick={toggleRequestModal}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSend}>
            Send
          </Button>
        </>
      }
    >
      <VStack>
        <FormControl id="email">
          <FormLabel>To</FormLabel>
          <Input type="email" placeholder="Name" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Message</FormLabel>
          <Input
            type="text"
            placeholder="Can I get a happy birthday for my mom (Jill)?"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Image (optional)</FormLabel>
          <Box {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag some files here or click to select files</p>
          </Box>
          <Flex as="aside" flexWrap="wrap" marginTop={16}>
            {files.map((file) => (
              <Box
                display="inline-flex"
                borderRadius={2}
                border="1px solid #eaeaea"
                marginBottom={8}
                marginRight={8}
                width={100}
                height={100}
                padding={4}
                boxSizing="border-box"
                key={file.name}
              >
                <Box minWidth={0} overflow="hidden">
                  <Img src={file.preview} width="auto" height="100%" />
                </Box>
              </Box>
            ))}
          </Flex>
        </FormControl>
      </VStack>
    </Dialog>
  );
}
