import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import pinataSDK from '@pinata/sdk';
import getConfig from 'next/config';

import AutographRequest from '../../abis/AutographRequestContract.json';
import { useContract } from '../../hooks';
import { addresses } from '../../utils/addresses';
import { JustinsAccount } from '../../utils/constants';
const { publicRuntimeConfig } = getConfig();

import axios from 'axios';
import FormData from 'form-data';
import { ChangeEvent, useRef, useState } from 'react';
import { FiRotateCcw, FiX } from 'react-icons/fi';
import SignaturePad from 'react-signature-canvas';

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
  const sigRef = useRef(null);
  const [penColor, setPenColor] = useState('black');

  function onClickUndo() {
    const data = sigRef.current.toData();
    if (data) {
      data.pop();
      sigRef.current.fromData(data);
    }
  }

  // const pinata = pinataSDK(
  //   process.env.PINATA_API_KEY,
  //   process.env.PINATA_API_SECRET,
  // );

  // pinata
  //   .testAuthentication()
  //   .then((result) => {
  //     //handle successful authentication here
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     //handle error here
  //     console.log(err);
  //   });

  async function onSend() {
    try {
      const requestId = 4;
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
    // toggleSignModal();
    // event.preventDefault();
    // let signature = null;

    //@ts-ignore
    // if (sigRef.current && !sigRef.current.isEmpty()) {
    //   signature = {
    //     //@ts-ignore
    //     data: sigRef.current.toDataURL().replace('data:image/png;base64,', ''),
    //     type: 'image/jpeg',
    //     name: 'photo.jpg',
    //   };

    //   console.log('signature:', signature);
    //   //@ts-ignore
    //   if (sigRef.current && !sigRef.current.isEmpty()) {
    //     //@ts-ignore
    //     base64SignatureImage = sigRef.current
    //       ?.getTrimmedCanvas()
    //       .toDataURL('image/png');

    //     console.log('base64SignatureImage:', base64SignatureImage);
    //   }
    // }
  }

  return (
    <Dialog
      isOpen={signModalIsOpen}
      onClose={toggleSignModal}
      header="Reply"
      footer={
        <>
          <Button variant="ghost" mr={3} onClick={toggleSignModal}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSend}>
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

        <Box
          backgroundImage={`url(${request.albumCover})`}
          backgroundRepeat="no-repeat"
          backgroundColor="white"
          w="80%"
          // h="80%"
          m="1rem auto"
          borderRadius="10px"
          boxShadow="md"
        >
          <SignaturePad
            canvasProps={{
              style: {
                border: '3px solid gray',
                borderRadius: '10px',
                width: '100%',
                minHeight: '400px',
              },
            }}
            ref={(ref) => (sigRef.current = ref)}
            penColor={penColor}
          />
        </Box>
        <HStack>
          <Select
            placeholder="Select option"
            defaultValue={penColor}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPenColor(e.target.value)
            }
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
              onClick={() => onClickUndo()}
              aria-label="undo"
              icon={<FiRotateCcw />}
            />
            <IconButton
              //@ts-ignore
              onClick={() => sigRef.current && sigRef.current.clear()}
              aria-label="clear"
              icon={<FiX />}
            />
          </ButtonGroup>
        </HStack>
      </>
    </Dialog>
  );
}
