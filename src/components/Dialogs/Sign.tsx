import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from '@chakra-ui/react';
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
    details: 'Can I get a happy birthday autograph?',
  };

  function onSend() {
    toggleSignModal();
  }

  const sigRef = useRef(null);

  const [penColor, setPenColor] = useState('black');
  const [penSize, setPenSize] = useState(16);

  function onClickUndo() {
    const data = sigRef.current.toData();

    if (data) {
      data.pop();
      sigRef.current.fromData(data);
    }
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

          <NumberInput
            step={1}
            defaultValue={16}
            min={1}
            max={30}
            onChange={(penSize) => setPenSize(parseInt(penSize))}
            value={penSize}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <ButtonGroup isAttached>
            <IconButton
              onClick={() => onClickUndo()}
              aria-label="undo"
              icon={<FiRotateCcw />}
            />
            <IconButton
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
