import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import getConfig from 'next/config';

import AutographRequest from '../../abis/AutographRequestContract.json';
import { useContract } from '../../hooks';
import { addresses } from '../../utils/addresses';
import { JustinsAccount } from '../../utils/constants';
import pinFileToIPFS from '../../utils/pin';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import FormData from 'form-data';
import { ChangeEvent, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { FiRotateCcw, FiX } from 'react-icons/fi';

import useStore from '../../store';
import Dialog from './Dialog';

export default function Sign() {
  const { signModalIsOpen, toggleSignModal } = useStore();
  const request = {
    albumCover:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=612&h=408&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F10%2Fharold-berman.jpg',
    from: 'Brennan',
    details: 'Can I get an autograph?',
  };
  const toast = useToast();
  const contract = useContract(
    addresses.autographRequest,
    AutographRequest.abi,
  );
  const canvasRef = useRef();
  const imageUploader = useRef(null);
  const [penColor, setPenColor] = useState('black');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImage(file);
    }
  };

  async function onSend() {
    setIsLoading(true);
    pinFileToIPFS(image, {
      name: request.from,
    });

    try {
      const requestId = 5;
      const hash = 'QmfAvnM89JrqvdhLymbU5sXoAukEJygSLk9cJMBPTyrmxo';
      const URI = `https://ipfs.io/ipfs/${hash}`;

      const tx = await contract.signRequest(requestId, hash, URI, {
        gasLimit: 210000,
      });

      await tx.wait();
      toast({
        title: 'Sent success',
        description: 'Autograph has been successfully minted',
        status: 'success',
        variant: 'top-accent',
        isClosable: true,
      });
      // cookie.remove('token');
      // cookie.set('token', 'ABC', { expires: 1 / 24 });
      toggleSignModal();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Signature failed',
        description: 'Please try again',
        status: 'error',
        variant: 'top-accent',
        isClosable: true,
      });
    }
    setIsLoading(false);
  }

  return (
    <Dialog
      isOpen={signModalIsOpen}
      onClose={toggleSignModal}
      header="Reply"
      disableClose={isLoading}
      footer={
        <>
          <Button variant="ghost" mr={3} onClick={toggleSignModal}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSend} isLoading={isLoading}>
            Send
          </Button>
        </>
      }
    >
      <>
        <Box mx="0">
          <Text textDecoration="underline">To</Text>
          <Text fontSize="1.25rem" fontWeight="500">
            {request.from}
          </Text>
          <Text textDecoration="underline">Message</Text>
          <Text fontSize="1.25rem" fontWeight="500">
            {request.details}
          </Text>
        </Box>

        <CanvasDraw
          style={{
            boxShadow:
              '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)',
          }}
          brushColor={penColor}
          // imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
          hideInterface
          hideGrid
          lazyRadius={0}
          brushRadius={2}
          ref={canvasRef}
        />

        <HStack mt="0.5rem">
          <Select
            placeholder="Select option"
            defaultValue={penColor}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPenColor(e.target.value)
            }
            size="sm"
          >
            <option value="red">🔴 Red</option>
            <option value="orange">🟠 Orange</option>
            <option value="yellow">🟡 Yellow</option>
            <option value="green">🟢 Green</option>
            <option value="blue">🔵 Blue</option>
            <option value="purple">🟣 Purple</option>
            <option value="black">⚫️ Black</option>
            <option value="white">⚪️ White</option>
          </Select>

          <ButtonGroup isAttached>
            <IconButton
              //@ts-ignore
              onClick={() => canvasRef.current.undo()}
              aria-label="undo"
              icon={<FiRotateCcw />}
              size="sm"
            />
            <IconButton
              //@ts-ignore
              onClick={() => canvasRef.current.clear()}
              aria-label="clear"
              icon={<FiX />}
              size="sm"
            />
          </ButtonGroup>
        </HStack>
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            // style={{}}
            className="custom-file-input"
          />
        </>
      </>
    </Dialog>
  );
}
