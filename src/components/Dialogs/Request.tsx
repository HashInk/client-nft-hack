import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Img,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AutographRequest from '../../abis/AutographRequestContract.json';
import { useContract } from '../../hooks';
import useStore from '../../store';
import { addresses } from '../../utils/addresses';
import Dialog from './Dialog';

export default function Request() {
  const { requestModalIsOpen, toggleRequestModal } = useStore();
  const [files, setFiles] = useState([]);
  const [requestForm, setRequestForm] = useState({
    to: '',
    message: '',
  });
  const toast = useToast();

  const contract = useContract(
    addresses.autographRequest,
    AutographRequest.abi,
  );

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

  async function onSend() {
    console.log('contract:', contract);
    try {
      const tx = await contract.createRequest(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        {
          // gasLimit: 21000,
          value: '100000000000000000',
        },
      );
      const res = await tx.wait();
      console.log('res:', res);
      toast({
        title: 'Request sent',
        description: 'Autograph pending...',
        status: 'success',
        variant: 'subtle',
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      });
    }
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
          <Button
            colorScheme="blue"
            onClick={onSend}
            isDisabled={requestForm.to === '' || requestForm.message === ''}
          >
            Send
          </Button>
        </>
      }
    >
      <VStack>
        <FormControl id="name" isRequired>
          <FormLabel>To</FormLabel>
          <Input
            type="email"
            placeholder="Name"
            value={requestForm.to}
            onChange={(e: any) =>
              setRequestForm({
                ...requestForm,
                to: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl id="message" isRequired>
          <FormLabel>Message</FormLabel>
          <Input
            type="text"
            placeholder="Can I get a happy birthday for my mom (Jill)?"
            value={requestForm.message}
            onChange={(e: any) =>
              setRequestForm({
                ...requestForm,
                message: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl id="image">
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
