import {
  Box,
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { FiRotateCcw, FiX } from 'react-icons/fi';
import SignaturePad from 'react-signature-canvas';

import useStore from '../../store';
import Dialog from './Dialog';

export default function Sign() {
  const { signModalIsOpen, toggleSignModal } = useStore();

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
          <Button colorScheme="tiffanyBlue" onClick={onSend}>
            Send
          </Button>
        </>
      }
    >
      <VStack>
        <Box mx="0">
          <Text textDecoration="underline">To</Text>
          <Text fontSize="1.25rem" fontWeight="500">
            John Doe
          </Text>
          <Text textDecoration="underline">Message</Text>
          <Text fontSize="1.25rem" fontWeight="500">
            Can I get a happy birthday autograph?
          </Text>
        </Box>
        <Box width="100%" height="100vh">
          {/* top="10%" left="10%" */}
          <Box
            backgroundImage="url(https://img.freepik.com/free-photo/3d-male-medical-figure-showing-shoulder-scaption_1048-8833.jpg?size=626&ext=jpg)"
            backgroundRepeat="no-repeat"
            w="80%"
            h="80%"
            m="0 auto"
          >
            <SignaturePad
              canvasProps={{ width: 500, height: 500 }}
              ref={(ref) => (sigRef.current = ref)}
              penColor={penColor}
            />
          </Box>
        </Box>

        <Select
          placeholder="Select option"
          defaultValue={penColor}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPenColor(e.target.value)
          }
          size="sm"
        >
          <option value="red">🔴</option>
          <option value="orange">🟠</option>
          <option value="yellow">🟡</option>
          <option value="green">🟢</option>
          <option value="blue">🔵</option>
          <option value="purple">🟣</option>
          <option value="black">⚫️</option>
          <option value="white">⚪️</option>
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

        <HStack>
          <Button
            onClick={() => onClickUndo()}
            aria-label="undo"
            leftIcon={<FiRotateCcw />}
          >
            Undo
          </Button>

          <Button
            onClick={() => sigRef.current && sigRef.current.clear()}
            aria-label="clear"
            leftIcon={<FiX />}
          >
            Clear
          </Button>
        </HStack>
      </VStack>
    </Dialog>
  );
}
