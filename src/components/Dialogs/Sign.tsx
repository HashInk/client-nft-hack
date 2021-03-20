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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/440px-Ethereum-icon-purple.svg.png',
    from: 'John Doe',
    details: 'Can I get a simple autograph?',
  };
  const toast = useToast();

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

  const contract = useContract(
    addresses.autographRequest,
    AutographRequest.abi,
  );

  const sigRef = useRef(null);

  const [imageURL, setImageURL] = useState(null);

  const [penColor, setPenColor] = useState('black');

  function onClickUndo() {
    const data = sigRef.current.toData();

    if (data) {
      data.pop();
      sigRef.current.fromData(data);
    }
  }
  let base64SignatureImage = '';

  async function onSend(event) {
    try {
      const requestId = 3;
      const hash = 'QmfAvnM89JrqvdhLymbU5sXoAukEJygSLk9cJMBPTyrmxo';
      const URI = `https://ipfs.io/ipfs/${hash}`;

      const tx = await contract.signRequest(requestId, hash, URI);

      await tx.wait();
      toast({
        title: 'Sent',
        description: 'Autograph has been successfully minted',
        status: 'success',
        variant: 'subtle',
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
        variant: 'subtle',
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
        {/* <Box width="100%" height="100vh" top="10%" left="10%"> */}

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
