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
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AutographRequest from '../../abis/AutographRequestContract.json';
import { useContract } from '../../hooks';
import useStore from '../../store';
import { addresses } from '../../utils/addresses';
import { JustinsAccount } from '../../utils/constants';
import Dialog from './Dialog';

export default function Request() {
  const { requestModalIsOpen, toggleRequestModal } = useStore();
  const addNotification = useStore((state) => state.addNotification);

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestForm, setRequestForm] = useState({
    to: '',
    message: '',
  });
  const toast = useToast();
  const priceForRequest = '100000000000000000';

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
    try {
      setIsLoading(true);
      const tx = await contract.createRequest(JustinsAccount, {
        gasLimit: 210000,
        value: priceForRequest,
      });
      await tx.wait();
      console.log('tx:', tx);
      toast({
        title: 'Request success',
        description: 'Autograph request has been sent',
        status: 'success',
        variant: 'top-accent',
        isClosable: true,
      });

      addNotification(tx.hash);

      // cookie.remove('token');
      // cookie.set('token', 'ABC', { expires: 1 / 24 });

      toggleRequestModal();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        variant: 'top-accent',
        isClosable: true,
      });
    }
    // cookie.set('requestForm.to', requestForm.to, { expires: 1 / 24 });
    // cookie.set('requestForm.message', requestForm.message, { expires: 1 / 24 });
    setIsLoading(false);
  }

  return (
    <Dialog
      isOpen={requestModalIsOpen}
      onClose={toggleRequestModal}
      header="Request"
      disableClose={isLoading}
      footer={
        <>
          <Button variant="ghost" mr={3} onClick={toggleRequestModal}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={onSend}
            isDisabled={requestForm.to === '' || requestForm.message === ''}
            isLoading={isLoading}
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
